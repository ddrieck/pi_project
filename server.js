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

/*app.get('/', routes.index);
app.use('/api', routes.router);*/

//ROUTES FOR OUR API
//======================
var router = express.Router(); //instance of express router

router.use(function(req, res, next){
	console.log('Something is happening.');
	next(); //make sure we go to the next routes and don't stop
}); //route middleware and first route here

// on routes that end in /bears
// ----------------------------
router.route('/products')

	//retrieve all bears
	.get(function(req, res){
		Product.find().limit(50).exec(function(err, products){
			console.log(products);
			if (err){
				res.send(err);
			} else {
				res.json(products);
			}
		});
	}); //Dean notice that the semicolon is what ends the route, not any brackets.

//on routes that end with /bears/:bear_id
//---------------------------------------
router.route('/products/category/parent/:product_cat')
	
	//get the bear with that id (accessed at GET http://localhost:8080/api/bears)
	.get(function(req,res){
		Product.find({ parentcategory :  req.params.product_cat }, function(err, product){
			if (err){
				res.send(err);
			} else {
				res.json(product);
			}
		});
	})

//on routes that end with /bears/:bear_id
//---------------------------------------
router.route('/products/category/:product_cat')
	
	//get the bear with that id (accessed at GET http://localhost:8080/api/bears)
	.get(function(req,res){
		Product.find({ category :  req.params.product_cat }, function(err, product){
			if (err){
				res.send(err);
			} else {
				res.json(product);
			}
		});
	})

//test route to make sure is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res){
	res.json({ message : 'hooray! welcome to our api!'});
});

// more routes for our API will happen here
//REGISTER OUR ROUTES -------------
//all of our routes will be prefixed with /api
app.use('/api', router);

//================
//START THE SERVER
//================
app.listen(port);
console.log("The app is running!");