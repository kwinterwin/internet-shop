import {JetView} from "webix-jet";

export default class DeclineReasonView extends JetView{

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
			height:200,
			modal:true,
			body:{
				rows:[
					{
						view:"toolbar",
						localId:"toolbar",
						cols:[
							{ view:"label", label: "Decline reasons", align:"left" },
							{ view:"button", type:"icon", icon:"times", inputWidth:25, align:"right", click:()=>{
								this.hideWindow();
							}}
						]
					},
					{
						template:(obj)=> {return obj;},
						localId:"template"
					}
				]
			}
		};
        
		return popup;
	}
    
	showWindow(values){
		this.setData(values);
		this.$$("popup").show();
		this.$$("template").setValues(values);
	}

	hideWindow(){
		this.$$("popup").hide();
	}

}