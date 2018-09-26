const order = require ("../models/order");

let orderData = {

	getUserOrder(req,res){
		if (req.session.user.type === "admin"){
			order.find({}, function(err, data){  
				if (err){
					res.status(500).send(err);
					console.log(err);
				}
				else{	
					res.json(data);
				}
			});
		}
		else{
			order.find({buyerEmail: req.session.user.email}, function(err, data){  
				if (err){
					res.status(500).send(err);
					console.log(err);
				}
				else{	
					res.json(data);
				}
			});
		}
	},
    
	addOrder(req,res){
		order.create(req.body, function(err){
			if (err){
				res.status(500).send(err);
				console.log(err);
			}
			else{
				res.json({});
			}
		});
	},

	updateOrder(req,res){
		order.findByIdAndUpdate(req.body._id, req.body, function(err, data){
			if (err){
				res.status(500).send(err);
				console.log(err);
			}
			else {
				res.json(data);
			}
		});
	}

};
module.exports = orderData;
