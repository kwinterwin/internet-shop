import {JetView} from "webix-jet";
import {bag} from "models/bag";

export default class BagView extends JetView{
	config(){
		const datatable = {
			view:"datatable",
			localId:"datatable",
			rowHeight:100,
			columns:[
				{header:"Image", fillspace:0.8, template:(obj)=>{ return `<img style='width:90%; display:block; margin:2% auto;'src='/server/${obj.picture}'/>`;},
					footer:{text:"Total:", colspan:4}},
				{id:"name", header:"Name", fillspace:2},
				{id:"amount", fillspace:1, header:"Amount"},
				{id:"price", header:"Price", fillspace:1},
				{id:"sum", fillspace:1, header:"Summ", footer:{ content:"summColumn" }},
				{template:"<i class='fa fa-trash delete' style='font-size: 30px; margin:20px; cursor:pointer;'></i>", fillspace:0.7}
			],
			select:true,
			footer:true,
			onClick:{
				delete:(e, id)=>{
					webix.confirm({
						text:"Product will be removed. Continue?",
						title:"Attention",
						ok:"Yes",
						cancel: "No",
						callback:(result)=>{
							if(result){
								bag.remove(this.$$("datatable").getItem(id.row).id);
								this.app.callEvent("onBagCount", [bag.data.order.length]);
							}
						}
					});
					return false;
				}
			}
		};
        
		

		return {
			rows:[
				datatable,
				{view:"button", value:"Make order", inputWidth:300, click:()=>{
					this.show("/start/makeOrder");
				}}
			]
		};
	}

	init(){
		bag.data.each((obj)=>{
			obj.sum = obj.amount*obj.price;
		});
		this.$$("datatable").parse(bag);
	}


}