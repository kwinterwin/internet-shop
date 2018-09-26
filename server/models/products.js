const mongoose  = require("mongoose");

let products = new mongoose.Schema({
	name: String,
	price: Number,
	picture: String,
	amount: Number,
	rating: {type:Number, default:0}
});

module.exports = mongoose.model("products", products); 