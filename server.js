const express=require("express")
const cors=require("cors")
const mongoose=require('mongoose')
const app=express()
require('dotenv').config()

//MiddleWares for app
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Api's
app.get("/",(req,res)=>{
    res.status(200).send("Ok")
})
app.use("/",require("./Routes/index"))




//Server Port assigning and executing
app.listen(process.env.PORT||3001,()=>{
    console.log("Server is running at port 3001 ")
})