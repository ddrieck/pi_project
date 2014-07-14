var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create the ProductSchema. This matches the product structure found in the Mongoose database
var ProductSchema = new Schema({
	/*_id : ObjectId,*/
	createdDate : Date,
	imageURL : String,
	title : String,
	category : String,
	isActive : Number,
	popularityIndex : Boolean,
	itemId : Number,
	parentCategory : String,
	department : String,
	upc : Number,
	brand : String,
	modifiedDate : Date,
	itemHashint64 : Number
});

//Export the new model, called Product, into our database module for use by the server.js file
module.exports = mongoose.model('Product', ProductSchema);