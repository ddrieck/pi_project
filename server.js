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

// more routes for our API will happen here
//REGISTER OUR ROUTES -------------
//all of our routes will be prefixed with /api
app.use(express.static(__dirname + '/public'));
app.use('/api', routes);


//================
//START THE SERVER
//================
app.listen(process.env.PORT || 3000, function() {
  console.log("listening on 3000");
});