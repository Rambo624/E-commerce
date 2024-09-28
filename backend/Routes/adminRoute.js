const express=require("express")
const router=express.Router()
const adminController= require("../Controllers/adminController")
const {userAuth}= require("../Middlewares/userauth")
const { sellerAuth } = require("../Middlewares/sellerAuth")


router.get("/",(req,res)=>{
    res.send("Hello admin")
})


router.post("/login",adminController.adminLogin)
router.post("/logout", adminController.adminLogout)
router.get("/profile/:id",sellerAuth,adminController.adminProfile)
router.put("/edit/:id",sellerAuth,adminController.adminEdit)
router.get("/check-user", sellerAuth, adminController.checkUser);
router.get("/getusers",sellerAuth,adminController.getUsers)
router.get("/getsellers",sellerAuth,adminController.getSellers)
router.put("/blockuser",sellerAuth,adminController.blockUser)
router.get("/getorders",sellerAuth,adminController.getOrders)
router.put("/verify/:id",sellerAuth,adminController.verifyOrder)
module.exports=router