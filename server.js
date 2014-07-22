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

//Create a static route for our static files and front-end javascript elements
app.use(express.static(__dirname + '/public'));
//All of our routes will have /api prefix. Routes are contained in the routes file
app.use('/api', routes);


//================
//START THE SERVER
//================
app.listen(process.env.PORT || 5000, function() {
  console.log("listening on 5000");
});