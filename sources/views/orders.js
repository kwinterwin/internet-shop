import {JetView} from "webix-jet";
import {order} from "models/order";
import ChangeStatusView from "./changeStatusPopup";

export default class OrderView extends JetView{

	config(){

		const datatable = {
			view:"datatable",
			select: "cell",
			localId:"datatable",
			columns:[
				{id:"name", header:["Product", {content:"textFilter"}], fillspace:2},
				{id:"amount", header:"Amount", fillspace:1},
				{id:"buyerName", header:["Buyer name", {content:"textFilter"}], fillspace:1},
				{id:"buyerEmail", header:"Buyer email", fillspace:1},
				{id:"phone", header:"Phone", fillspace:1},
				{id:"address", header:"Address", fillspace:1},
				{id:"delivery", header:"Delivery", fillspace:1},
				{id:"payment", header:"Payment", fillspace:1},
				{id:"orderDate", header:"Order Date", fillspace:2},
				{id:"status", header:"Status", fillspace:1}
			],
			on:{
				onAfterSelect:(id)=>{
					if (id.column === "status"){
						let status = this.$$("datatable").getItem(id.row);
						this._jetPopup.showWindow(status);
					}
				}
			}
		};

		return datatable;
	}

	init(){
		order.waitData.then(()=>{this.$$("datatable").parse(order);});
		this._jetPopup = this.ui(ChangeStatusView);
	}
}