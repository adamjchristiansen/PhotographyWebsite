var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

var fortunes = [ 
    "conquer your fears or they will conquer you", 
    "do not fear what you don't know", 
    "you will win a million dollars",
    "you will have a scarry dream tonight"
    ];

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
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