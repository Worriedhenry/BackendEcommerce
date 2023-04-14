const express=require("express")
const cors=require("cors")
const mongoose=require('mongoose')
const app=express()
require('dotenv').config()
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
app.post("/user/login",usersController.login)
app.post("/user/register",usersController.register)
app.post("/seller/login",usersController.login)
app.post("/seller/register",usersController.register)





//Server Port assigning and executing
app.listen(process.env.PORT||3001,()=>{
    console.log("Server is running at port 3001 ")
})