const mongoose  = require("mongoose");

let categories = new mongoose.Schema({
	name: String,
	manufacturers:[{name: String}]
});

module.exports = mongoose.model("categories", categories); 