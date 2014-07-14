//==========
//BASE SETUP
//==========

//assign and call needed packages
var express = require('express');
var app = express();
var mongoose = require("mongoose");

//Load up our route and model config files
var database = require('./app/configs/database');
var routes = require('./app/routes/routes');
var Product = require('./app/models/product');

//Connect to the database
mongoose.connect(database.url);

//Set our port. Heroku has 5000 as example so we'll do that
var port = process.env.PORT || 5000;

// more routes for our API will happen here
//REGISTER OUR ROUTES -------------
//all of our routes will be prefixed with /api
app.use('/api', routes);
/*app.use(express.static(__dirname, '/public'));*/
//================
//START THE SERVER
//================
app.listen(port);
console.log("The app is running!");