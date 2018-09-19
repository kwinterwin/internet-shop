var seeder = require("mongoose-seed");


let mon = {
    
	con(){
		seeder.connect("mongodb://localhost/shop_varin", function() {

			seeder.loadModels([
				"./server/models/categories.js",
				"./server/models/users.js",
				"./server/models/order.js",
				"./server/models/products.js"
			]);
            
			let data = [
				{
					"model": "users",
					"documents": [
						{
							"name": "Anna",
							"email": "samuseva.a.s@mail.ru",
							"password": "123",
							"type":"user",
							"createdDate":"19-09-2018 15:30"
						},
						{
							"name": "admin",
							"email": "admin@mail.ru",
							"password": "1",
							"type":"admin",
							"createdDate":"19-09-2018 15:30"
						}
					]
				},
				{
					"model": "categories",
					"documents": [
						{
							"name": "Phones",
							"manufacturers": [
								{"name":"Lenovo"},
								{"name":"Nokia"},
								{"name":"Samsung"}
							]
						}
					]
				},
				{
					"model": "order",
					"documents": [
						{
							"name": "Lenovo K6",
							"buyerName":"Anna",
							"buyerEmail": "samuseva.a.s@mail.ru",
							"amount": "1",
							"phone":"123456",
							"orderDate":"19-09-2018 15:30",
							"address":"uergbouehr",
							"delivery":"Master",
							"payment":"Card",
							"status":"In process",
							"message":""
						},
						{
							"name": "Lenovo K5",
							"buyerName":"Anna",
							"buyerEmail": "samuseva.a.s@mail.ru",
							"amount": "2",
							"phone":"87987874",
							"orderDate":"19-09-2018 15:30",
							"address":"uergbouehr",
							"delivery":"Master",
							"payment":"Card",
							"status":"In process",
							"message":""
						}
					]
				},
				{
					"model": "products",
					"documents": [
						{
							"name": "Lenovo K6",
							"price":200,
							"picture":"lenovo_k6.jpg",
							"amount":20,
							"rating":200
						},
						{
							"name": "Samsung Galaxy S6",
							"price":400,
							"picture":"samsung_galaxy_s6.jpg",
							"amount":20,
							"rating":0
						},
						{
							"name": "Nokia Lumia",
							"price":250,
							"picture":"nokia_lumia.jpg",
							"amount":20,
							"rating":0
						}
					]
				}
			];

			seeder.clearModels(["users", "categories", "order", "products"], function() {
				seeder.populateModels(data, function() {
					seeder.disconnect();
				});
 
			});
		});
	}
 

};

module.exports = mon;