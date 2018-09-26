import {JetView} from "webix-jet";
import {order} from "models/order";

export default class ChangeStatusView extends JetView{

	setData(values){
		this.values=values;
	}

	getData(){
		return this.values;
	}

	config(){
		const popup = {
			view:"popup",
			localId:"popup",
			position:"center",
			width:500,
			modal:true,
			body:{
				rows:[
					{
						view:"toolbar",
						localId:"toolbar",
						cols:[
							{ view:"label", label: "Change status", align:"left" },
							{ view:"button", type:"icon", icon:"times", inputWidth:25, align:"right", click:()=>{
								this.hideWindow();
							}}
						]
					},
					{
						view:"richselect",
						labelWidth:120,
						label:"Choose status", 
						localId:"richselect",
						value:1, options:[ 
							{ "id":"In process", "value":"In process"}, 
							{ "id":"Declined", "value":"Declined"}, 
							{ "id":"Done", "value":"Done"}
						],
						on:{
							onChange:()=>{
								if(this.$$("richselect").getValue() === "Declined"){
									this.$$("textarea").show();
								}
							}
						}
					},
					{ 
						view:"textarea", 
						labelWidth:120,
						label:"Indicate reason", 
						hidden:true,
						localId:"textarea",
						labelAlign:"left", 
						height:150 
					},
					{view:"button", value:"Save", click:()=>{
						let obj = this.getData();
						obj.status = this.$$("richselect").getValue();
						if(obj.status === "Declined"){
							let message = this.$$("textarea").getValue();
							if(message === ""){
								webix.message({type:"error", text:"Field 'Indicate reason' can't be empty, if status is 'Declined'."});
							}
							else {
								obj.message = this.$$("textarea").getValue();
								order.updateItem(obj.id, obj);
								this.hideWindow();
							}
						}
						else{
							obj.message = this.$$("textarea").getValue();
							order.updateItem(obj.id, obj);
							this.hideWindow();
						}
					}}
				]
			}
		};
        
		return popup;
	}
    
	showWindow(values){
		this.setData(values);
		this.$$("popup").show();
		this.$$("richselect").setValue(values.status);
		this.$$("textarea").setValue(values.message);
	}

	hideWindow(){
		this.$$("popup").hide();
	}

}