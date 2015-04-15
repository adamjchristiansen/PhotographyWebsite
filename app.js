var express = require('express');
var path = require('path');
var fortune = require('./lib/fortune.js');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', { fortune: fortune.getFortune() });
});

//custom 404 page
app.use(function(req, res){
	res.status(404);
    res.render('404');

});

//custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
    res.render('500');
});

module.exports = app;