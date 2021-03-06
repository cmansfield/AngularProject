

//load main modules
var express = require('express');

//load express middleware modules
var logger = require('morgan');
var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var colors = require('colors');
var nconf = require('nconf');
var winston = require('winston');


var loggerWin = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});

loggerWin.log('info', 'Loading Server');

//create express app
var app = express();

app.use(cors());

//insert middleware
app.use(logger('dev'));
app.use(compression());

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json 
app.use(bodyParser.json());


nconf.argv()
    .env()
    .file({ file: 'config.json' });
nconf.set('database:host', '127.0.0.1');
nconf.set('database:port', 3000);
// __dirname is the loction to this folder, but I want it to goto the web folder
nconf.set('WebDir', __dirname.replace('server', 'web'));
// '/home/ubuntu/workspace/FinalProject_v1/students'
nconf.set('StudentDir', __dirname.replace('/server', ''));


app.use(favicon(nconf.get('WebDir') + '/test/favicon.ico'));

// =====================================================================
//REST API calls go here.
// AKA: REST end points
// Create
// https://cs3660-christopherm.c9users.io/api/v1/students
app.post('/api/v1/students', function(req, res) {
    var id;
    req.body.id = undefined;
    var data = JSON.stringify(req.body, null, 2);
    
    fs.readdir(__dirname + '/students', function(err, files) {
        if (err) {
            loggerWin.info('Error getting file list'.red);
            return null;
        }
        
        files = files.map(filename => filename.replace('.json', ''));
        id = Number(files[files.length - 1]);
        id = ('0000' + (id + 1)).slice(-4);
        
        fs.writeFile(`${__dirname}/students/${id}.json`, data, 'utf8', function(err) {
            if (err) throw err;
            // TODO handle 404
    
            res.status(201).json(id);
        });
    });
});

// Read
// https://cs3660-christopherm.c9users.io/api/v1/students/<id>.json
app.get('/api/v1/students/:id.json', function(req, res) {
    var id = req.params.id;

    fs.readFile(__dirname + `/students/${id}.json`, 'utf8', function(err, fileContent) {
        if (err) res.status(404);

        res.status(200).header('Content-Type', 'application/json').json(fileContent);
    });
});

// Update
// https://cs3660-christopherm.c9users.io/api/v1/students/<id>.json
app.put('/api/v1/students/:id.json', function(req, res) {
    var id = req.params.id;
    req.body.id = undefined;
    var data = JSON.stringify(req.body, null, 2);

    fs.writeFile(`${__dirname}/students/${id}.json`, data, 'utf8', function(err) {
        if (err) loggerWin.info(`Unable to update ${id}.json`.red);

        res.status(204);
    });
});

// Delete
// https://cs3660-christopherm.c9users.io/api/v1/students/<id>.json
app.delete('/api/v1/students/:id.json', function(req, res) {
    var id = req.params.id;
    fs.unlink(`${__dirname}/students/${id}.json`, function(err) {
        if (err) res.status(404);

        res.sendStatus(204);
    });
});

// List
// https://cs3660-christopherm.c9users.io/api/v1/students.json
app.get('/api/v1/students.json', function(req, res) {

    fs.readdir(__dirname + '/students', function(err, files) {
        if (err) res.status(500);

        res.status(200).json(files);
    });
});

// End REST Calls
// =====================================================================

//traditional webserver stuff
app.use(express.static(nconf.get('WebDir'))); //express is serving static files as if it were Apache
app.use(express.static(nconf.get('StudentDir')));
app.get('*', function(req, res) {

    res.status(404).sendFile(nconf.get('WebDir') + '/404.html');
});

//process.env.PORT
//process.env.IP
var server = app.listen(nconf.get('database:port'), nconf.get('database:host'));

function gracefullShutdown() {

    loggerWin.info('\nStarting Shutdown'.yellow);
    server.close(function() {
        loggerWin.info('\nShutdown Complete'.yellow);
    });
}

process.on('SIGTERM', gracefullShutdown);

process.on('SIGINT', gracefullShutdown);

//SIGKILL (kill -9) can't be caught by any process, including node
//SIGSTP/SIGCONT (stop/continue) can't be caught by node
