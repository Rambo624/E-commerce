const express=require("express")
const router=express.Router()
const userController= require("../Controllers/userController")
const {userAuth}= require("../Middlewares/userauth")
const {upload}=require("../Middlewares/multer")
const {sellerAuth}= require("../Middlewares/sellerAuth")

router.post("/signup", userController.userSignup)
router.post("/login",userController.userLogin)
router.post("/logout", userController.userLogout)
router.get("/profile",userAuth,userController.userProfile)
router.put("/edit",upload.single("profilepic"),userAuth,userController.userEdit)
router.get("/check-user", userAuth, userController.checkUser);
router.delete("/delete",userAuth,userController.userDelete)
router.post("/address",userAuth,userController.addAddress)
router.delete("/deleteaddress/:id",userAuth,userController.removeAddress)
module.exports=router