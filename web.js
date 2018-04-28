var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    appConfig = require('./appconfig');


var port = process.env.PORT || 3000;

app.set('superSecret', appConfig.secret); // secret variable
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

     //intercepts OPTIONS method
     if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    } else {
        // Pass to next layer of middleware
        next();
    }
    //console.log('middle');
});

app.get('/', function (req, res) {
    res.send('Welcome test page!!');
    //res.sendFile('./index.html', { root: '/'});
});

app.get('/api/test', function(req, res) {
    res.status(200).json({message:'Testing error message'});
});

var server = app.listen(port, function () {
    console.log('Node server is running on the Port..' + port);
});
