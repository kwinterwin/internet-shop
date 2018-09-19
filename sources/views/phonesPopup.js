import {JetView} from "webix-jet";
import {products} from "models/products";

export default class PopupPhoneView extends JetView{

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
			height:400,
			position:"center",
			width:500,
			modal:true,
			body:{
				rows:[
					{
						view:"toolbar",
						localId:"toolbar",
						cols:[
							{ view:"label", label: "", align:"left", localId:"toolbarPhoneName" },
							{ view:"button", type:"icon", icon:"times", inputWidth:25, align:"right", click:()=>{
								this.hideWindow();
							}}
						]
					},
					{
						template:(obj)=>{
							return `<div class="flex-container">
							<div>
								<img style='width:90%;' src="/server/${obj.picture}">
							</div>
							<div class='information'>
								<span><b>Name: </b>${obj.name}</span>
								<span><b>Price: </b>${obj.price}$</span>
								<span><b>Rating: </b>${obj.rating} <i class="fa fa-star-o rating" style="margin-left:40px; cursor:pointer; font-size:20px;"></i></span>
							</div>
						</div>`;
						},
						borderless:true,
						onClick:{
							rating:()=>{
								this.getData().rating += 5;
								this.$$("template").setValues(this.getData());
								products.updateItem(this.getData().id, this.getData());
							}
						},
						localId:"template"
						
					}
					
				]
			}
		};
        
		return popup;
	}
    
	showWindow(values){
		this.setData(values);
		this.$$("toolbarPhoneName").setValue(values.name);
		this.$$("template").setValues(values); 
		this.$$("popup").show();
	}

	hideWindow(){
		this.$$("popup").hide();
	}

}