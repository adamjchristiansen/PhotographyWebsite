var express = require('express');
var path = require('path');
var fortune = require('./lib/fortune.js');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

function getWeatherData() {
	console.log("in getWeatherData()");
	return {
		locations: [
			{
				name: 'Portland',
				forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
				weather: 'Overcast',
				temp: '54.1 F (12.3 C)',
			},
		],
	};
}

app.use(function(req, res, next) {
	console.log("in app.use");
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = getWeatherData();
	console.log(res.locals.partials.weather);
	next();
});

app.get('/nursery-rhyme', function(req, res) {
	res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res) {
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});

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