import {JetView} from "webix-jet";

export default class LoginView extends JetView{
	config(){


		const login_toolbar = {
			view:"toolbar",
			margin:-20,
			paddingX:70,
			css:"grayToolbar",
			cols:[
				{ view:"label", label:"Varin shop", align:"left"},
				{ view:"button", label:"Login", width:100, align:"right", type:"icon", click:()=>{
					if(this.$$("loginForm").isVisible() === false){
						this.$$("loginForm").show();
						this.$$("registerForm").hide();
						this.$$("resetPassword").hide();
					}
				}},
				{ view:"button", label:"Register", width:100, align:"right", type:"icon", click:()=>{
					if(this.$$("registerForm").isVisible() === false){
						this.$$("loginForm").hide();
						this.$$("registerForm").show();
						this.$$("resetPassword").hide();
					}
				}}
			]
		};


		const login_form = {
			view:"form",
			localId:"loginForm",
			width:700, 
			css:"form",
			paddingX:90,
			elements:[
				{ view:"template", template:"Login", type:"header", borderless:true},
				{ view:"text", label:"E-Mail Address", type:"email", name:"email", labelWidth:150, invalidMessage:"Email must contain a character @."},
				{ view:"text", label:"Password", type:"password", name:"password", labelWidth:150, invalidMessage:"Password can't be empty."},
				{
					view:"checkbox", 
					labelRight:"Remember Me",
					labelWidth:150,
					css:"remember"
				},
				{
					cols:[
						{width:150},
						{ view:"button", value:"Login", click:() => this.do_login(), hotkey:"enter", localId:"loginBtn", inputWidth:100, width:120},
						{ view: "button", type:"icon", label: "Forgout Your Password?", css:"forgoutPassword", borderless:true, click:()=>{
							this.$$("loginForm").hide();
							this.$$("resetPassword").show();
						}}
					]
				}
			],
			rules:{
				"email":webix.rules.isEmail,
				"password":webix.rules.isNotEmpty
			}
		};

		

		const register_form = {
			view:"form",
			localId:"registerForm",
			width:600, 
			css:"form",
			paddingX:90,
			hidden:true,
			elements:[
				{ view:"template", template:"Register", type:"header", borderless:true, localId:"header"},
				{ view:"text", label:"Name", type:"text", name:"name", labelWidth:150, localId:"name", invalidMessage:"Name can't be empty."},
				{ view:"text", label:"E-Mail Address", type:"email", name:"email", labelWidth:150, localId:"emailFiled", attributes:{
					required:"true"
				}, invalidMessage:"Email must contain a character @.", on:{
					"onFocus":()=>{
						this.$$("emailFiled").setValue("");
						this.$$("emailFiled").setBottomText("");
					}
				}},
				{ view:"text", label:"Password", type:"password", name:"password", labelWidth:150, invalidMessage:"Password can't be empty.", localId:"passwordFiled", on:{
					"onFocus":()=>{
						this.$$("passwordFiled").setValue("");
						this.$$("passwordFiled").setBottomText("");
					}
				}},
				{ view:"text", label:"Confirm Password", type:"password", name:"confirmPassword", labelWidth:150, localId:"confirmPassword", invalidMessage:"This area can't be empty."},
				{
					cols:[
						{width:150},
						{ view:"button", value:"Register", click:() => {this.authorization();}, hotkey:"enter", localId:"authorizBtn", inputWidth:100}
					]
				}
			],
			rules:{
				"name":webix.rules.isNotEmpty,
				"email":webix.rules.isEmail,
				"password":webix.rules.isNotEmpty,
				"confirmPassword":webix.rules.isNotEmpty
			}
		};

		const reset_password = {
			view:"form",
			localId:"resetPassword",
			width:600, 
			css:"form",
			paddingX:90,
			hidden:true,
			elements:[
				{ view:"template", template:"Reset Password", type:"header", borderless:true, localId:"header"},
				{ view:"text", label:"E-Mail Address", type:"email", name:"email", labelWidth:150, attributes:{
					required:"true",
				}},
				{
					cols:[
						{width:150},
						{ view:"button", value:"Send Password Reset Link", click:() => {}, hotkey:"enter", inputWidth:230, invalidMessage:"Password can't be empty."}
					]
				}
			],
			rules:{
				"email":webix.rules.isNotEmpty
			}
		};

		return {
			rows:[
				login_toolbar,
				{height:40},
				{
					cols:[
						{},login_form,register_form,reset_password,{}
					]
				}, {}
			]
		};
	}

	init(view){
		view.$view.querySelector("input").focus();
	}

	authorization(){
		let form = this.$$("registerForm");

		if (form.validate()){
			const data = form.getValues();
			if(data.password === data.confirmPassword){
				delete data.confirmPassword;
				var myformat = webix.Date.dateToStr("%d-%m-%Y %H:%i");
				var text = myformat(new Date());
				data.createdDate = text;			

				webix.ajax().post("/server/login/authorization", data).then((result)=> {
					if(result.json().hasOwnProperty("message")){
						this.$$("emailFiled").setBottomText(result.json().message);
						this.$$("passwordFiled").setValue("");
						this.$$("confirmPassword").setValue("");
					}
					else {
						webix.message({type:"debug", text:"Successful registration"});
						this.$$("registerForm").clear();
						this.$$("registerForm").hide();
						this.$$("loginForm").show();
					}
				});
			}
			else{
				this.$$("passwordFiled").setBottomText("The password confirmation does not match.");
				this.$$("passwordFiled").setValue("");
				this.$$("confirmPassword").setValue("");
			}
				
			
		}
	}

	do_login(){
		const user = this.app.getService("user");
		const form = this.$$("loginForm");
		if (form.validate()){
			const data = form.getValues();
			user.login(data.email, data.password);
		}
	}
}