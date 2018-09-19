const products = require ("../models/products");

let productsData = {

	addProduct(req,res){
		products.create({
			"name": req.body.name,
			"price": req.body.price,
			"picture": req.file.originalname,
			"amount": req.body.amount
		}, function(err){
			if(err){
				console.log(err);
				res.status(500).send(err);
			}
			else{
				res.json({});
			}
		});
	},

	getProduct(req,res){
		products.find({}, function(err, data){
			if(err){
				console.log(err);
				res.status(500).send(err);
			}
			else{
				res.send(data);
			}
		});
	},

	filterProducts(req,res){
		let phone = req.body;
		let phoneFilter = {
			name: new RegExp(phone.phones, "i")
		};

		products.find(phoneFilter).exec(function(err, data){
			if(err){
				console.log(err);
				res.status(500).send(err);
			}
			else{
				res.send(data);
			}
		});
		
	},
	
	saveData(req,res){
		products.findByIdAndUpdate(req.body._id, req.body, function(err, data){
			if(err){
				console.log(err);
				res.status(500).send(err);
			}
			else{
				res.json(data);
			}
		});
	}

};
module.exports = productsData;
