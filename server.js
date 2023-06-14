const express=require("express")
const cors=require("cors")
const mongoose=require('mongoose')
const app=express()
const upload = require("./controllers/multer")
require('dotenv').config()
const path=require("path")
const CookieParser=require("cookie-parser")
const Product=require("./models/Product")
const cloudinary=require("./controllers/cloudinary")
const auth=require("./middleware/auth")
const auth1=require("./middleware/AuthForSeller")
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to db")
}).catch(err=>{
    console.log(err)
})
app.set("view engine","ejs")
app.set('views', './views')
//MiddleWares for app
app.use(cors())
app.use(CookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Api's
const tokentoUser=require("./middleware/TokenToUser")
const usersController=require("./controllers/userController")
const adminController=require("./controllers/seller")
app.get("/",(req,res)=>{
    res.status(200).send("Ok")
})
app.get("/home",usersController.home)
app.get("/user/profile",auth,usersController.getprofile)
app.post("/login",usersController.login)
app.post("/register",usersController.register)
app.get("/cheak",usersController.get)
// app.post("/admin/register",adminController.Register)
// app.post("/admin/login",adminController.Login)
// app.get("/admin/info", auth1 ,adminController.Info)
app.get("/getdata",tokentoUser)


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
//Server Port assigning and executing
app.listen(process.env.PORT||3001,()=>{
    console.log("Server is running at port 3001 ")
})