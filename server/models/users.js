const mongoose  = require("mongoose");

let users = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	type: {
		type: String,
		default: "user"
	},
	createdDate: String
});

module.exports = mongoose.model("users", users); 