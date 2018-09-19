const categories = require ("../models/categories");

let categoriesData = {

	getCategoriesData(req,res){
		categories.find({}, function(err, data){
			if (err){
				res.status(500).send(err);
				console.log(err);
			}
			else{
				let mass = data.map((item)=>{
					item.id = item._id;
					for(let i=0; i<item.manufacturers.length;i++){
						item.manufacturers[i].id = item.manufacturers[i]._id;
					}
					return item;
				});
				res.json(mass);
			}
		});
	}

};
module.exports = categoriesData;
