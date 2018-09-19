import {JetView} from "webix-jet";

export default class AddNewProductView extends JetView{

	config(){
		const form = {
			view:"form",
			localId:"form",
			borderless:true,
			elements:[
				{ view:"text", label:"Name:", name:"name", required:true, inputWidth:400, placeholder:"Type name"},
				{ view:"text", label:"Price:", name:"price", required:true, inputWidth:400, placeholder:"Type price" },
				{ view:"text", label:"Amount:", name:"amount", required:true, inputWidth:400, placeholder:"Type amount" },
				{
					view:"uploader",
					localId: "pictureUploader",
					inputWidth:200,
					select:true,
					accept:"image/jpeg, image/png",
					autosend:false,
					multiple:false,
					upload:"/server/products",
					value:"Add picture",
					on:{
						onAfterFileAdd:()=>{
							webix.message({"type":"debug", "text":"File is upload"});
						}
					}
				},
				{ 
					view:"textarea", 
					labelPosition:"top",
					label:"About product", 
					height:150,
					inputWidth:400
				}
			]
		};

		return {
			rows:[
				form, 
				{
					cols:[
						{width:15},
						{view:"button", value:"Add new product", inputWidth:300, type:"form", click:()=>{
							this.$$("pictureUploader").files.data.each((file)=>{
								let values = this.$$("form").getValues();
								file.formData = values;
								this.$$("pictureUploader").send();
							});
						}}
					]
				},
				{}
			]
		};
	}

	init(){
	}
}