const express=require("express")
const mongoose=require('mongoose')
const app=express()
require('dotenv').config()
const path=require("path")
const CookieParser=require("cookie-parser")
const auth=require("./middleware/auth")
const auth1=require("./middleware/AuthForSeller")
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to db")
}).catch(err=>{
    console.log(err)
})
//MiddleWares for app
const corsOptions ={
    origin:'https://fastkart.onrender.com/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(CookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



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
var Auth=require("./controllers/Authorisation")
app.use("/",Auth)
// Api's
const tokentoUser=require("./middleware/TokenToUser")
const usersController=require("./controllers/userController")
const adminController=require("./controllers/seller")
app.get("/home",usersController.home)
app.get("/user/profile",auth,usersController.getprofile)
app.post("/login",usersController.login)
app.post("/register",usersController.register)
app.get("/cheak",usersController.get)
app.get("/Auth",tokentoUser)


//Server Port assigning and executing
app.listen(process.env.PORT||3001,()=>{
    console.log("Server is running at port 3001 ")
})