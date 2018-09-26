import {JetView} from "webix-jet";
import {bag} from "models/bag";
import {order} from "models/order";

export default class BagView extends JetView{
	config(){
		const form = {
			view:"form", 
			localId:"form",
			borderless:true,
			elements:[
				{ view:"text", label:"Your Name", required:true, placeholder:"Type your name", labelWidth:200, invalidMessage:"Your Name can not be empty", name:"buyerName"},
				{ view:"text", label:"Email", required:true, placeholder:"Type your email", labelWidth:200, invalidMessage: "Incorrect e-mail", name:"buyerEmail"},
				{ view:"text", label:"Phone", required:true, placeholder:"Type your phone number", labelWidth:200, invalidMessage: "Incorrect phone", name:"phone"},
				{ view:"richselect", label:"Delivery type", name:"delivery", value:"Master", options:[ 
					{ "id":"Pickup", "value":"Pickup"}, 
					{ "id":"Master", "value":"Master"}, 
					{ "id":"Post", "value":"Post"}
				], labelWidth:200},
				{ view:"text", label:"Delivery address", name:"address", required:true, placeholder:"Type your address", labelWidth:200, invalidMessage:"Delivery address can not be empty"},
				{ view:"richselect", name:"payment", label:"Payment type", value:"Card", options:[ 
					{ "id":"Card", "value":"Card"}, 
					{ "id":"Cash payment", "value":"Cash payment"}, 
					{ "id":"Online payment", "value":"Online payment"}
				], labelWidth:200 },
				{view:"button", value:"Checkout", click:()=>{
					this.$$("form").validate();
					bag.data.each((obj)=>{
						let values = this.$$("form").getValues();
						var myformat = webix.Date.dateToStr("%d-%m-%Y %H:%i");
						var text = myformat(new Date());
						values.orderDate = text;
						values.status = "In process";
						values.amount = obj.amount;
						values.name = obj.name;
						order.add(values);
					});
					this.show("/start/history");
					bag.clearAll();
					this.app.callEvent("onBagCount", [0]);
				}}
			],
			rules:{ 
				"name":webix.rules.isNotEmpty,
				"email":webix.rules.isEmail,
				"phone":webix.rules.isNotEmpty,
				"delivery":webix.rules.isNotEmpty
			}
		};
        
		

		return {
			rows:[
				form,
				{}
			]
		};
	}

	init(){

	}


}


