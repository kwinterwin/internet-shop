import {JetView} from "webix-jet";
import {products} from "models/products";
import "../components";
import PopupPhoneView from "./phonesPopup";
import {bag} from "models/bag";

export default class PhonesDatatableView extends JetView{
	config(){

		const datatable = {
			view:"datatableCounter",
			localId:"datatable",
			rowHeight:100,
			columns:[
				{header:"Image", fillspace:0.8, template:(obj)=>{ return `<img style='width:90%; display:block; margin:2% auto;'src='/server/${obj.picture}'/>`;}},
				{id:"name", header:["Name", {content:"textFilter"}], fillspace:2},
				{id:"price", header:"Price", fillspace:1},
				{id:"rating", header:"Rating", fillspace:1},
				{template: "<div class='counter'>{common.counterButton()}</div>", fillspace:1, header:"Amount"},
				{header:"Buy", template:"<i class='fa fa-shopping-cart buy' style='font-size: 60px; padding:20px; cursor:pointer;'></i>", fillspace:0.7}
			],
			activeContent:{
				counterButton:{
					localId:"counterButton",
					view:"counter",
					value:0,
					width:120
				}
			},
			on:{
				onItemDblClick:(id)=>{
					this._jetPopup.showWindow(this.$$("datatable").getItem(id.row));
				},
				onAfterFilter:()=>{
					let url = this.getUrl();
					var regexp = new RegExp(url[0].params.phone);
					this.$$("datatable").filter((obj)=>{
						return obj.name.search(regexp) != -1;
					}, "", true);
				}
			},
			select:true,
			onClick:{
				webix_inp_counter_prev:()=>{
					return false;
				},
				webix_inp_counter_value:()=>{
					return false;
				},
				webix_inp_counter_next:()=>{
					return false;
				},
				buy:(id, data)=>{
					let values = this.$$("datatable").getItem(data.row);
					if(values.counterButton === 0 || values.hasOwnProperty("counterButton")===false){
						webix.message({type:"error", text:"Please, enter the quantity of product."});
					}
					else {
						if(bag.exists(values._id)){
							bag.getItem(values._id).amount += values.counterButton;
						}
						else{
							bag.add({name:values.name, amount:values.counterButton, id:values._id, picture:values.picture, price:values.price});
							webix.message({type:"info", text:`${values.counterButton} ${values.name} has been added to your bag.`});
							this.app.callEvent("onBagCount", [bag.data.order.length]);
						}
					}
					return false;
				}
			}
		};

		return datatable;
	}

	init(){
		products.waitData.then(()=>{
			this.$$("datatable").parse(products);
			this.on(this.app, "onDatatableFilter", (data) => {
				if(data.name != "Phones")
					this.setParam("phone", data.name, true);
				else 
					this.show("/start/phonesDatatable");
			});
		});
		this._jetPopup = this.ui(PopupPhoneView);
	}

	urlChange(view, url){
		products.waitData.then(()=>{
			if(typeof url[0].params.phone != "undefined"){
				var regexp = new RegExp(url[0].params.phone);
				this.$$("datatable").filter((obj)=>{
					return obj.name.search(regexp) != -1;
				});
			}
			else{
				this.$$("datatable").filter((obj)=>{
					return obj;
				});
			}
		});
	}

}