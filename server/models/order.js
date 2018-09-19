const mongoose  = require("mongoose");

let order = new mongoose.Schema({
	name: String,
	amount: Number,
	buyerName: String,
	buyerEmail: String,
	phone: String,
	address: String,
	delivery: String,
	payment: String,
	orderDate: String,
	status: String,
	message: {type:"String", default:""}
});

module.exports = mongoose.model("order", order); 