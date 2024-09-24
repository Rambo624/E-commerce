const express=require("express")
const orderController=require("../Controllers/orderController")
const router=express.Router()
const {userAuth}= require("../Middlewares/userauth")


router.get("/getorder",userAuth,orderController.getOrder)





module.exports=router