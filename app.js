const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

// read
app.route('/students')
    .get(function (req, res) {
        mysqlConnection.query('SELECT * FROM student', (err, rows, fields) => {
            res.send(rows);
        })
    })

// update
app.put('/students/update', (req, res) => {
    let l = req.body;
    mysqlConnection.query('UPDATE student SET student_name=?,student_email=?,course_id=? WHERE student_id = ?', [l.name, l.email, l.course_id, l.id], (err, rows, fields) => {
        if (!err)
            res.send(' Record updated successfully.');
        else
            console.log(err);
    })
});

// delete
app.delete('/students/delete/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM student WHERE student_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Record  successfully.');
        else
            console.log(err);
    })
});

//insert
app.put('/students/insert', (req, res) => {
    let l = req.body;
    mysqlConnection.query('INSERT INTO student VAlUES(?,?,?,?)', [l.name, l.id, l.email, l.course_id], (err, rows, fields) => {
        if (!err)
            res.send('Record added successfully.');
        else
            console.log(err);
    })
});



//setting middleware
app.use(express.static(__dirname + 'public')); //Serves resources from public folder

app.use('/images', express.static(__dirname + '/images'));




const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));


