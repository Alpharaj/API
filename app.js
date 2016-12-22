var express = require("express");
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'rajput',
    database : 'agrobrew_db'
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app,connection);

var server = app.listen(3000,function () {
    console.log("Listening at port ",server.address().port);
});