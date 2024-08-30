const express=require("express")
const router=express.Router()
const userController= require("../Controllers/userController")
const {userAuth}= require("../Middlewares/userauth")

router.get("/",(req,res)=>{
    res.send("Hello user")
})

router.post("/signup", userController.userSignup)
router.post("/login",userController.userLogin)
router.post("/logout", userController.userLogout)
router.get("/profile/:id",userAuth,userController.userProfile)
router.put("/edit/:id",userAuth,userController.userEdit)
router.get("/check-user", userAuth, userController.checkUser);
router.delete("/:id",userAuth,userController.userDelete)


module.exports=router