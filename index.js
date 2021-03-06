'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var requestify = require('requestify');
var moment = require('moment');

var PORT = process.env.PORT || 3000;
var BASE_URL = 'https://hooks.freshworks.com/1D370FmbsTpqkpjgYEnv/crl9wwBIwbvtis2Ipd5vuTyTqcUYTIzyKW2';
// var BASE_URL = 'https://enhg710gfqqim.x.pipedream.net';


var API_OPTIONS = {
    headers: { accept: 'application/json' }
};

var app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
    response.sendFile('./public/home.html', { root: __dirname });
});

app.get('/help', function (request, response) {
    response.sendFile('./public/auth_form.html', { root: __dirname });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/email', function (req, res) {
    
    // console.log(req.body);
    
    // res.json({ ok: true });
    
    var URL = BASE_URL;

    var record = {
        user_data: req.body,
        timestamp: moment().unix(moment().format())
    };
    console.log(record);

    requestify.post(URL, record, API_OPTIONS).then(function (fbres) {
        console.log('Success');
        // res.json(fbres);
        res.json(fbres);
    }).catch(function (err) {
        res.json(err);
    });
});

app.listen(PORT, function () {
    console.log('Freshchat proxy listening on port %s.', PORT);
});
