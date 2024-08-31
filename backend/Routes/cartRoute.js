const express=require("express")
const router=express.Router()
const cartController= require("../Controllers/cartController")
const {userAuth}= require("../Middlewares/userauth")




router.post("/addtocart",userAuth,cartController.addToCart)


module.exports=router