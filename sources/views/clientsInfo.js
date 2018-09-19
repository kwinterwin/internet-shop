import {JetView} from "webix-jet";

export default class ClientsInfoView extends JetView{

	setLength(value){
		this.length = value;
	}

	getLength(){
		return this.length;
	}
    
	incrLength(){
		return this.length++;
	}

	config(){

		const datatable = {
			view:"datatable",
			localId:"datatable",
			editable:true,
			editaction:"dblclick",
			columns:[
				{id:"number", header:"№", fillspace:1},
				{id:"name", editor:"text", header:["Name", {content:"textFilter"}], fillspace:1.2},
				{id:"email", header:["Email", {content:"textFilter"}], editor:"text", fillspace:3},
				{id:"createdDate", editor:"date", header:"Created at", fillspace:1.5, format: (value)=>{
					var myformat = webix.Date.dateToStr("%d-%m-%Y %H:%i");
					return myformat(value);
				}}
			],
			datafetch:10,
			loadahead:15,
			url:"/server/users",
			save:"rest->/server/users/",
			select:true,
			scheme: {
				$init:(obj)=>{
					obj.number = this.getLength();
					this.incrLength();
					var myparse = webix.Date.strToDate("%d-%m-%Y %H:%i");
					obj.createdDate = myparse(obj.createdDate);
				},
				$save:(obj)=>{
					console.log("save");
					var myformat = webix.Date.dateToStr("%d-%m-%Y %H:%i");
					obj.createdDate = myformat(obj.createdDate);
				}
			},
			rules:{
				"name": webix.rules.isNotEmpty,
				"email": webix.rules.isEmail,
				"date": webix.rules.isNotEmpty
			}
		};

		return datatable;
	}

	init(){
		this.setLength(1);
	}
}