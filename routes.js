var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("guestbook/"));

// Home page
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Guestbook page
app.get("/guestbook", function (req, res) {
    var data = require("./json_guestbook_data.json");

    var results = '<table class="table">';
    results += "<thead>" +
        "<tr>" +
        "<th scope='col'>Name</th>" +
        "<th scope='col'>Country</th>" +
        "<th scope='col'>Date</th>" +
        "<th scope='col'>Message</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";
    for (var i = 0; i < data.length; i++) {
        results +=
            "<tr>" +
            "<td>" +
            data[i].username +
            "</td>" +
            "<td>" +
            data[i].country +
            "</td>" +
            "<td>" +
            data[i].date +
            "</td>" +
            "<td>" +
            data[i].message +
            "</td>" +
            "</tr>";
    }
    results += "</tbody>"
    "</table>";

    res.send(`<!doctype html>
    <html class="no-js" lang="">
    
    <head>
        <meta charset="utf-8">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    
        <link rel="manifest" href="site.webmanifest">
        <link rel="apple-touch-icon" href="icon.png">
        <!-- Place favicon.ico in the root directory -->
    
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
    
        <meta name="theme-color" content="#fafafa">
    </head>
    
    <body>
        <!--[if IE]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
      <![endif]-->
        <div class="jumbotron text-center" style="margin-bottom:0">
            <h1>My Guestbook Application</h1>
        </div>
        <nav class="navbar navbar-expand-sm bg-light navbar-light justify-content-center">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/newmessage">Add entry</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/guestbook">View guestbook</a>
                </li>
            </ul>
        </nav>
    </body>
    
    </html>` + results);
});

// New message page
app.get("/newmessage", function (req, res) {
    res.sendFile(__dirname + "/newmessage.html");
});

app.post("/newmessage", function (req, res) {
    var data = require("./json_guestbook_data.json");

    data.push({
        "username": req.body.username,
        "country": req.body.country,
        "message": req.body.message,
        "date": new Date()
    });

    var jsonStr = JSON.stringify(data);

    fs.writeFile("./json_guestbook_data.json", jsonStr, err => {
        if (err) throw err;
        console.log("Message sent!");
    });
    res.sendFile(__dirname + "/messagesent.html");
});

app.get("/ajaxmessage", function (req, res) {
    res.sendFile(__dirname + "/ajaxmessage.html");
});

app.post("/ajaxmessage", function (req, res) {
    var data = require("./json_guestbook_data.json");

    data.push({
        "username": req.body.username,
        "country": req.body.country,
        "message": req.body.message,
        "date": new Date()
    });

    var jsonStr = JSON.stringify(data);

    fs.writeFile("./json_guestbook_data.json", jsonStr, err => {
        if (err) throw err;
        console.log("Message sent!");
    });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/404.html");
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log("Guestbook app listening on port 8081!");