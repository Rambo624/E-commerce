const express=require("express")
const router=express.Router()
const cartController= require("../Controllers/cartController")
const {userAuth}= require("../Middlewares/userauth")




router.post("/addtocart",userAuth,cartController.addToCart)
router.get("/getcart/:id",userAuth,cartController.getCartDetails)
router.put("/updatecart/:id",userAuth,cartController.updateCart)
router.delete("/removecart/:productId",userAuth,cartController.removeCart)
router.post("/payment",userAuth,cartController.payment)
router.get("/getsession",userAuth,cartController.getSession)
router.put("/addquantity",userAuth,cartController.productQuantity)
router.delete("/clearcart",userAuth,cartController.clearCart)
module.exports=router