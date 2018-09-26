const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const users = require("./server/route/users");
const categories = require("./server/route/categories");
const products = require("./server/route/products");
const order = require("./server/route/order");
const session = require("express-session");
const con = require("./server/mogoose_seed");

let app = express();

let port = 3000;

con.con();

mongoose.connect("mongodb://localhost/shop_varin");
app.use("/server", express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: "replace this string... k12jh40918e4019u3",
	resave: false,
	saveUninitialized:true,
	cookie: { maxAge: 60*60*1000 }
}));

var multer  = require("multer");
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});
var upload = multer({ storage: storage });


app.post("/server/login", users.login);
app.post("/server/login/status", users.loginStatus);
app.post("/server/logout", users.logout);
app.post("/server/login/authorization", users.authorization);
app.put("/server/users/:id", users.saveData);

app.get("/server/users", users.getAllUsers);

app.get("/server/categories", categories.getCategoriesData);

app.post("/server/products", upload.single("upload"), products.addProduct);
app.get("/server/products", products.getProduct);
app.post("/server/filterPhones", products.filterProducts);
app.put("/server/products/:id", products.saveData);

app.get("/server/order/", order.getUserOrder);
app.post("/server/order/", order.addOrder);
app.put("/server/order/:id", order.updateOrder);

app.listen(port, ()=>{
	console.log("Start");
});