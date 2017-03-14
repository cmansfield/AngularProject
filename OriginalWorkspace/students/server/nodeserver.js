

console.log('Loading Server');

// __dirname is the loction to this folder, but I want it to goto the web folder
const WEB = __dirname.replace('server', 'web');

// '/home/ubuntu/workspace/FinalProject_v1/students'
const DIR_STUDENTS = __dirname.replace('/server', '');

//load main modules
var express = require('express');

//load express middleware modules
var logger = require('morgan');
var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors')

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

app.use(favicon(WEB + '/test/favicon.ico'));


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
            console.log('Error getting file list');
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
        if (err) throw err;

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
app.use(express.static(WEB)); //express is serving static files as if it were Apache
app.use(express.static(DIR_STUDENTS));
app.get('*', function(req, res) {
    res.status(404).sendFile(WEB + '/404.html');
});

var server = app.listen(process.env.PORT, process.env.IP);

function gracefullShutdown() {
    console.log('\nStarting Shutdown');
    server.close(function() {
        console.log('\nShutdown Complete');
    });
}

process.on('SIGTERM', gracefullShutdown);

process.on('SIGINT', gracefullShutdown);

//SIGKILL (kill -9) can't be caught by any process, including node
//SIGSTP/SIGCONT (stop/continue) can't be caught by node
