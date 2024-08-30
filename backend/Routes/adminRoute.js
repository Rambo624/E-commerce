const express=require("express")
const router=express.Router()
const adminController= require("../Controllers/adminController")
const {userAuth}= require("../Middlewares/userauth")


router.get("/",(req,res)=>{
    res.send("Hello admin")
})


router.post("/login",adminController.adminLogin)
router.post("/logout", adminController.adminLogout)
router.get("/profile/:id",userAuth,adminController.adminProfile)
router.put("/edit/:id",userAuth,adminController.adminEdit)
router.get("/check-user", userAuth, adminController.checkUser);



module.exports=router