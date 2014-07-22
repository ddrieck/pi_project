var express = require('express');
var Product = require('../models/product');

//All of our routers are going to added to this module and used by server.js
/*exports.index = function(req,res){
	res.send("Hello World!");
};*/

// on routes that end in /bears
// ----------------------------
module.exports = (function(){
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
			Product.find().limit(100).exec(function(err, products){
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
	router.route('/products/category/parent')
		
		//get the bear with that id (accessed at GET http://localhost:8080/api/bears)
		.get(function(req,res){
			Product.distinct('parentCategory', function(err, product){
				if (err){
					res.send(err);
				} else {
					product = product.sort();
					res.json(product);
				}
			});
		});
		
	router.route('/products/category/parent/:parent_cat')

		.get(function(req,res){
			Product.find({ parentCategory :  req.params.parent_cat }, function(err, product){
				if (err){
					res.send(err);
				} else {
					res.json(product);
				}
			});
		});

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
		});

	router.route('/products/search/category/:cat_search')

		.get(function(req,res){
			Product.find({ $or: [ {category : { $regex : req.params.cat_search, $options: 'i'}}, {parentCategory : { $regex : req.params.cat_search, $options: 'i'}}]}, function(err, product){
				if (err){
					res.send(err);
				} else {
					res.json(product);
				};
			});
		});

	router.route('/products/search/:keyword')

		.get(function(req,res){
			Product.find({ title : { $regex : req.params.keyword, $options: 'i'}}, function(err, product){
				if (err){
					res.send(err);
				} else {
					res.json(product);
				}
			});
		});

	//test route to make sure is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res){
		res.json({ message : 'hooray! welcome to our api!'});
	});

	return router;
})();