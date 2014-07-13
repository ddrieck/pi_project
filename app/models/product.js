var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	_id : ObjectId,
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

module.exports = mongoose.model('Product', ProductSchema);