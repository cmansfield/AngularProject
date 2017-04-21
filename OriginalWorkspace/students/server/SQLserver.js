
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'students'
});

connection.connect();

router.get('/api/v1/students/:id.json', function (req, res) {

    let id = req.params.id;
    //res.set('Connection', 'close');

    connection.query(`SELECT * from students where id=${id}`, function(err, result, fields) {

        if (err) {

            console.log('Error while performing Query.');
            res.status(500);
        }
        else res.status(200).json(result[0]);
    });
});

router.get('/api/v1/students.json', function (req, res) {

    //res.set('Connection', 'close');

    connection.query(`SELECT id from students`, function(err, result, fields) {

        if (err) {

            console.log('Error while performing Query.');
            res.status(500);
        }
        else res.status(200).json(JSON.parse(JSON.stringify(result)));
    });
});

//connection.end();