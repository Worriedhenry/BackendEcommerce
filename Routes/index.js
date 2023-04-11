const express=require("express")
const router=express.Router()
const usersController=require("../controllers/userController")
router.get("/",usersController.home)
router.get("/user/profile",usersController.profile)
router.use("/user/register",require("./user_register"))
router.use("/user/login",require("./user_login"))
router.use("/seller/register",require("./seller_register"))
router.use("/seller/login",require("./seller_login"))




module.exports=router;