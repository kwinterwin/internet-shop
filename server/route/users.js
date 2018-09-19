const users = require ("../models/users");

let usersData = {

	

	login: function(req, res){
		let user = {};
		user.email = req.body.user;
		user.password = req.body.pass;
		users.find(user, function (err, data) {
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				if(data.length == 1){
					user.name = data[0].name;
					user.type = data[0].type;
					req.session.user = user;
					res.send(user);
				}
				else
					res.send(null);
			}
		});
	},

	loginStatus: function(req, res){
		res.send(req.session.user || null);
	},

	logout: function(req,res){
		delete req.session.user;
		res.send({});
	},
    
	authorization: function(req, res){
		users.find({"email":req.body.email}, function(err, data){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				if(data.length==0){
					users.create(req.body, function(err){
						if(err){
							res.status(500).send(err);
							console.log(err);
						} else {
							res.json({});
						}
					});
				}
				else res.json({"message":"The email has already been taken."});
			}
		});
		
	},

	getAllUsers(req,res){
		if(req.query.start){
			let count = Number(req.query.count);
			let skip = Number(req.query.start);
		
			users.find({}).skip(skip).limit(count).exec(function(err,data){
				if(err){
					console.log(err);
					res.status(500).send(err);
				}
				else{
					res.json({
						"data":data,
						"pos":skip
					});
				}
			});
		}
		else {
			users.find({}, function(err, allData){
				users.find({}).limit(15).exec(function(err,data){
					if(err){
						console.log(err);
						res.status(500).send(err);
					}
					else{
						res.json({
							"data": data,
							"pos": 0,
							"total_count": allData.length
						});
					}
				});
			});
		}
	},

	saveData(req,res){
		users.findByIdAndUpdate(req.body._id, req.body, function(err, data){
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
module.exports = usersData;
