var express = require('express');
var Product = require('../models/product');

//All of our routers are going to added to this module and used by server.js

// module exports allows these routes to be accessible by the server.js file
// ----------------------------
module.exports = (function(){
	//ROUTES FOR OUR API
	//======================
	var router = express.Router(); //instance of express router

	//Intiate our express router. Simple console log to make sure it's working
	router.use(function(req, res, next){
		console.log('Something is happening.');
		next(); //make sure we go to the next routes and don't stop
	});

	// Our products route. Returns all products
	// ----------------------------
	router.route('/products') ///api/products

		//We use mongoose and find all elements limited to 100 returns. Otherwise people will be waiting until the next super moon
		.get(function(req, res){
			Product.find().limit(100).exec(function(err, products){
				//Return our products as a json file if all is successful
				if (err){
					res.send(err);
				} else {
					res.json(products);
				}
			});
		}); \

	//Our parent categories route. Returns all parent categories
	//---------------------------------------
	router.route('/products/category/parent') //Use GET /api/products/category/parent
		
		//Get the results of mongo distinct query to give us an array of distinct product categories
		.get(function(req,res){
			Product.distinct('parentCategory', function(err, product){
				if (err){
					res.send(err);
				} else {
					//Sort our parent categories so they are nice and alphabetized
					product = product.sort();
					res.json(product);
				}
			});
		});
		
	//Our parent categories match route. Returns all products that match the parent category
	//---------------------------------------
	router.route('/products/category/parent/:parent_cat') //Use GET /api/products/category/parent/VALUE

		.get(function(req,res){
			//We are finding parent categories that match the URL input. Must be an exact match in order to return results
			Product.find({ parentCategory :  req.params.parent_cat }, function(err, product){
				if (err){
					res.send(err);
				} else {
					res.json(product);
				}
			});
		});

	//Our categories match route. Returns all products that match the category
	//---------------------------------------
	router.route('/products/category/:product_cat') //Use GET /api/products/category/VALUE
		
		.get(function(req,res){
			//We are finding categories that match the URL input. Must be an exact match in order to return results
			Product.find({ category :  req.params.product_cat }, function(err, product){
				if (err){
					res.send(err);
				} else {
					res.json(product);
				}
			});
		});

	//Our first search route. This searches both parent categories and regular categories for products that match user input
	//---------------------------------------
	router.route('/products/search/category/:cat_search') //Use GET /api/products/search/category/VALUE

		.get(function(req,res){
			//We are searching in both category and parentCategory fields. Also using regex on the database side as it's a bit easier. Probably not as robust though... Regex is case insensitive
			Product.find({ $or: [ {category : { $regex : req.params.cat_search, $options: 'i'}}, {parentCategory : { $regex : req.params.cat_search, $options: 'i'}}]}, function(err, product){
				if (err){
					res.send(err);
				} else {
					res.json(product);
				};
			});
		});
	
	//Our second search route. This searches product titles, looking for matches to keyword user input
	//---------------------------------------
	router.route('/products/search/:keyword')
	//Use GET /api/products/search/VALUE

		.get(function(req,res){
			//Looking through all our titles and doing a mongo regex match on the title
			Product.find({ title : { $regex : req.params.keyword, $options: 'i'}}, function(err, product){
				if (err){
					res.send(err);
				} else {
					res.json(product);
				}
			});
		});

	//test route to make sure is working (Use GET /api)
	router.get('/', function(req, res){
		res.json({ message : 'Ze API is working!'});
	});

	return router;
})();