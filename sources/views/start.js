import {JetView, plugins} from "webix-jet";
import {categories} from "models/categories";

export default class Start extends JetView{
	config(){

		const toolbar =  { 
			view: "toolbar",
			paddingX:40,
			elements: [
				{ view:"label", label:"Varin shop", align:"left"},
				{ view:"label", label:"", align:"center", localId:"nameLabel"},
				{ view:"button", label:"Logout", width:100, align:"right", type:"icon", click:()=>{
					this.show("/logout");
				}},
				{ view:"button", label:"History", width:100, align:"right", type:"icon", localId:"historyBtn", click:()=>{
					this.show("/start/history");
				}},
				{ view:"button", label:"Bag", width:100, align:"right", type:"icon", localId:"bagButton", click:()=>{
					this.show("/start/bag");
				}}
			]
		};

		let user_sidebar = { 
			view: "tree",
			localId:"tree",
			width:300,
			select:true,
			hidden:true,
			on:{
				onAfterSelect:()=>{
					let filter = {"name":this.$$("tree").getSelectedItem().name};
					this.app.callEvent("onDatatableFilter", [filter]);
				}
			}
		};

		let admin_sidebar = {
			view: "sidebar",
			localId:"adminSidebar",
			hidden:true,
			data: [
				{id: "clientsInfo", value: "Clients info"},
				{id: "orders", value:"Orders"},
				{id: "addNewProduct", value:"Add new product"}	
			]
		};
		
		return {
			rows:[
				toolbar,
				{
					cols:[
						{ 
							rows:[
								user_sidebar,
								admin_sidebar,
								{height:1}]
						},
						{$subview:true}
					]
				}
			]
		};

	}
	
	init(){

		this.use(plugins.Menu, "adminSidebar");
	
		const user = this.app.getService("user");
		let dataUser = user.getUser();
		this.$$("nameLabel").setValue(`Hi, ${dataUser.name}`);

		if(dataUser.type === "user"){
			categories.waitData.then(()=>{
				let data = [];
				let firstId = categories.getFirstId();
				if(typeof firstId != "undefined"){
					let nextId = firstId;
					while(typeof nextId != "undefined"){
						let top = categories.getItem(nextId);
						top.data = [];
						top.value = top.name;
						for(let i=0;i<top.manufacturers.length;i++){
							top.manufacturers[i].value = top.manufacturers[i].name;
							top.data.push(top.manufacturers[i]);
						}
						delete top.manufacturers;
						nextId = categories.getNextId(nextId, 1);
						data.push(top);
					}
				}
				this.$$("tree").parse(data);
			});
			this.$$("tree").show();
			this.show("../start/phonesDatatable");
		}
		else {
			this.$$("adminSidebar").show();
			this.$$("historyBtn").hide();
			this.$$("bagButton").hide();
			this.show("/start/" + this.$$("adminSidebar").getFirstId());
		}

		this.on(this.app, "onBagCount", (data) => {
			this.$$("bagButton").setValue(`Bag (${data})`);
		});

	}

}