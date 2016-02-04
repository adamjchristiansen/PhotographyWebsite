console.log("starting app.js");

var express = require('express');
var path = require('path');
var fortune = require('./lib/fortune.js');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

function getWeatherData() {
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
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = getWeatherData();
	next();
});

//Get requests

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', { fortune: fortune.getFortune() });
});

app.get('/newsletter', function(req, res) {
	res.render('newsletter', {csrf: 'CSRF goes here'});
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

app.get('/thank-you', function(req, res) {
	res.render('thank-you');
});

app.get('/contest/vacation-photo', function(req, res) {
	var now = new Date();
	res.render('contest/vacation-photo', {
		year: now.getFullYear(), month: now.getMonth()
	});
});


//Post requests

// app.post('/process', function(req, res) {
// 	console.log('Form (from querystring): ' + req.query.form);
// 	console.log('CSRF token (from hidden form field): ' + req.body._csrf);
// 	console.log('Name (from visible form field): ' + req.body.name;
// 	console.log('EMail (from visible form field): ' + req.body.email);
// 	res.redirect(303, '/thank-you');
// });

app.post('/process', function(req, res) {
	console.log('Form (from querystring): ' + req.query.form);
	console.log('CSRF token (from hidden form field): ' + req.body._csrf);
	console.log('Name (from visible form field): ' + req.body.name);
	console.log('Email (from visible form field): ' + req.body.email);

    if(req.xhr || req.accepts('json,html')==='json'){
        // if there were an error, we would send { error: 'error description' }
        res.send({ success: true });
    } else {
        // if there were an error, we would redirect to an error page
        res.redirect(303, '/thank-you');
    }
});

app.post('/contest/vacation-photo/:year/:month', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if(err) return res.redirect(303, '/error');
		console.log('received fields:');
		console.log(fields);
		console.log('received files:');
		console.log(files);
		res.redirect(303, '/thank-you');
	});
});



//Fall to these responses if others aren't hit first
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

console.log("ending app.js");