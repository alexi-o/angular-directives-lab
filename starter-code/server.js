
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var db = require('./models');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function index(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/cards', function show(req,res){
	db.Card.find({}, function(err,cards){
		res.json(cards);
	});
});

app.get('/cards/:id', function show(req, res){	
	db.Card.findById({id: req.params.id})
	.exec(function(err, card){
		res.json(card);
	});
});

app.post('/cards', function create(req,res){
	console.log(req.body);
	var newCard = new db.Card({
		question: req.body.question
		});
		newCard.save(function(err,card){
	});
		res.end();
});

app.delete('/cards/:id',function(req, res){
	var id = req.params.id;
	db.Card.findByIdAndRemove({_id: id}, function(err, cards){
		if (err) res.json(err);
		console.log("Removed " + id);
		res.json(cards);
	});
});



app.listen(port, function() {
  console.log('Server started on', port); 
});