const express=require("express")
const cors=require("cors")
const mongoose=require('mongoose')
const app=express()
const upload = require("./controllers/multer")
require('dotenv').config()
const path=require("path")
const Product=require("./models/Product")
const cloudinary=require("./controllers/cloudinary")
const auth=require("./middleware/auth")
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to db")
}).catch(err=>{
    console.log(err)
})
app.set("view engine","ejs")
app.set('views', './views')
//MiddleWares for app
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Api's
const usersController=require("./controllers/userController")
app.get("/",(req,res)=>{
    res.status(200).send("Ok")
})
app.get("/home",usersController.home)
app.get("/user/profile",usersController.getprofile)
app.post("/login",usersController.login)
app.post("/register",usersController.register)
app.get("/cheak",usersController.get)
app.post("/seller/login",usersController.login)
app.post("/seller/register",usersController.register)

var index=require("./controllers/ProductController")
app.use("/",index)
var Catlog=require("./controllers/Catlog")
app.use("/",Catlog)
var Cart=require("./controllers/Cart")
app.use("/",Cart)
var Search=require("./controllers/Search")
app.use("/",Search)
var Order=require("./controllers/Order")
app.use("/",Order)
var Profile=require("./controllers/Profile")
app.use("/",Profile)
var Seller=require("./controllers/seller")
app.use("/",Seller)
var Review =require("./controllers/reviews")
app.use("/",Review)
//Server Port assigning and executing
app.listen(process.env.PORT||3001,()=>{
    console.log("Server is running at port 3001 ")
})