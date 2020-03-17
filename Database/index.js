var express = require("express");
var app = express();
var mysql = require("mysql");
var cors = require("cors");
const bodyParser = require("body-parser");
const formData = require("express-form-data");

app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "entity_demo",
    password: "",
    database: "test"
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected to the database successfully...");
});

app.use(cors());
app.use(formData.parse());

app.post("/function", function (req, res) {

    // console.log(req.body);

    var sql = `DROP TABLE functionn`;
    con.query(sql, (err, req) => {
        if (err) {
            console.log(
                "Error Occured in cleaning table function"
            );
        } else console.log("Table functionn cleaned");
    });

    var sql = `DROP TABLE flow`;
    con.query(sql, (err, req) => {
        if (err) {
            console.log(
                "Error Occured in cleaning table flow"
            );
        } else console.log("Table flow cleaned");
    });

    var sql = `DROP TABLE queuee`;
    con.query(sql, (err, req) => {
        if (err) {
            console.log(
                "Error Occured in cleaning table queuee"
            );
        } else console.log("Table queuee cleaned");
    });

    var sql = `DROP TABLE func_property`;
    con.query(sql, (err, req) => {
        if (err) {
            console.log(
                "Error Occured in cleaning table func_property"
            );
        } else console.log("Table func_property cleaned");
    });

    var sql = `CREATE TABLE IF NOT EXISTS functionn (
        function_id VARCHAR(100),
        function_name VARCHAR(50)
        );`;
    con.query(sql, (err, req) => {
        if (err) {
            console.log(
                "Error Occured in creating table functionn, may be it is already exists"
            );
            console.log(err)
        } else console.log("Table functionn Created");
    });

    var sql = `CREATE TABLE IF NOT EXISTS queuee (
        queue_id VARCHAR(100),
        flow_id VARCHAR(100),
        function_id VARCHAR(100),
        srmo VARCHAR(10),
        prop_1 VARCHAR(10),
        prop_2 VARCHAR(10),
        status VARCHAR(64),
        datetime DATE
        );`;
    con.query(sql, (err, req) => {
        if (err) {
            console.log(
                "Error Occured in creating table queuee, may be it is already exists"
            );
            console.log(err)
        } else console.log("Table queuee Created");
    });

    var sql = `CREATE TABLE IF NOT EXISTS flow (
        flow_id VARCHAR(100),
        subaction VARCHAR(10),
        mapped_flow_id VARCHAR(10),
        flow_name VARCHAR(255),
        function_id VARCHAR(100),
        function_prop_id VARCHAR(100)
        );`;
    con.query(sql, (err, req) => {
        if (err) {
            console.log(
                "Error Occured in creating table flow, may be it is already exists"
            );
            console.log(err)
        } else console.log("Table flow Created");
    });

    var sql = `CREATE TABLE IF NOT EXISTS func_property (
        function_prop_id VARCHAR(100),
        prop_1 VARCHAR(10),
        prop_2 VARCHAR(10),
        prop_3 VARCHAR(10),
        prop_4 VARCHAR(10)
        );`;
    con.query(sql, (err, req) => {
        if (err) {
            console.log(
                "Error Occured in creating table func_property, may be it is already exists"
            );
            console.log(err)
        } else console.log("Table func_property Created");
    });


    req.body.map((value, value_index) => {
        // console.log(value)

        if (value.linksTo === undefined) {
            console.log("Node Not linked")
        } else {
            //console.log(value.linksTo)
            var sql = `INSERT INTO functionn 
                (
                    function_id, 
                    function_name) 
                    VALUES 
                (
          '${value.id}', 
         '${value.name}')`;
            con.query(sql, (err, req) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Value INSERTED functionn Successfully");
                }
            });

            value.linksTo.map((link, link_index) => {
                console.log(value)
                var sql = `INSERT INTO flow 
                (
                    flow_id, 
                    mapped_flow_id,
                    flow_name,
                    function_id,
                    function_prop_id
                    ) 
                    VALUES 
                (
          '${link.target}', 
         '${link.target}',
         "${'none'}",
         '${value.id}',
         "${value.id + '_PROP'}")`;
                con.query(sql, (err, req) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Value INSERTED flow Successfully");
                    }
                });
                var sql = `INSERT INTO queuee 
                    (
                        queue_id, 
                        flow_id,
                        function_id
                        ) 
                        VALUES 
                    (
                "${value.id + '_QUEUE'}", 
                '${link.target}',
                '${value.id}')`;
                con.query(sql, (err, req) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Value INSERTED queuee Successfully");
                    }
                });
            })
        }
    })
});


var server = app.listen(3020, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server app listening at http://%s:%s", host, port);
});