import {JetView} from "webix-jet";
import {order} from "models/order";
import DeclineReasonView from "./declinedReason";

export default class BagView extends JetView{
	config(){
		const datatable = {
			view:"datatable",
			localId:"datatable",
			select:true,
			columns:[
				{id:"name", header:["Product", {content:"textFilter"}], fillspace:2},
				{id:"amount", header:"Amount", fillspace:1},
				{id:"address", header:"Address", fillspace:1},
				{id:"delivery", header:"Delivery", fillspace:1},
				{id:"payment", header:"Payment", fillspace:1},
				{id:"orderDate", header:"Order Date", fillspace:1.5},
				{id:"status", header:"Status", fillspace:1}
			],
			on:{
				onAfterSelect:(id)=>{
					let obj = this.$$("datatable").getItem(id.row);
					if(obj.status === "Declined"){
						this._jetPopup.showWindow(obj.message);
					}
				}
			}
		};
        
		return datatable;
	}

	init(){
		order.waitData.then(()=>{
			this.$$("datatable").parse(order);
		});
		
		this._jetPopup = this.ui(DeclineReasonView);
	}


}


