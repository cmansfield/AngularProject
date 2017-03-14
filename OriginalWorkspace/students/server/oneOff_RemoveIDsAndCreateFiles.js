
const FILE_NAME = 'students.json';

var fs = require('fs');
var studendID;

var students = JSON.parse(fs.readFileSync(`${FILE_NAME}`, 'utf8', (err) => { if (err) throw err}));

students.forEach(function(student, i) {
    studendID = student.id;
    student.id = undefined;
    fs.writeFile(`students/${studendID}.json`, JSON.stringify(student, null, 4), (err) => { if (err) throw err} );
});
