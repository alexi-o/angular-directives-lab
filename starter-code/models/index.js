var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cardsApp");

module.exports.Card = require("./cards.js");