var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "botviral"
});

// Read the url arguements
app.get('/share', function(req, res) {
  con.connect(function(err) {
    if (err) throw err;
// Register the share has led to a CTA
    var sql = "INSERT INTO shares (campaignid, user, shares) VALUES (" + req.query.cpn + " ," + req.query.usr + ", 1)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log ("1 record inserted");
    });
// Get the url from the campaign
    var sql = "select url from campaign where id = " + req.query.cpn;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      Object.keys(result).forEach(function(key) {
        var row = result[key];
        console.log(row.url);
// Redirect to the camapaign url
        res.redirect(row.url);
      });
    });
  });
});


app.listen(port);

console.log('botViral RESTful API server started on: ' + port);
