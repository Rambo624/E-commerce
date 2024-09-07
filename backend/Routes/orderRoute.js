const express=require("express")
const orderController=require("../Controllers/orderController")
const router=express.Router()



router.post("/createorder",orderController.createOrder)





module.exports=router