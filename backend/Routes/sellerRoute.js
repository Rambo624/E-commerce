const express=require("express")
const router=express.Router()
const sellerController= require("../Controllers/sellerController")
const {userAuth}= require("../Middlewares/userauth")

router.get("/",(req,res)=>{
    res.send("Hello user")
})

router.post("/signup", sellerController.sellerSignup)
router.post("/login",sellerController.sellerLogin)
router.post("/logout", sellerController.sellerLogout)
router.get("/profile/:id",userAuth,sellerController.sellerProfile)
router.put("/edit/:id",userAuth,sellerController.sellerEdit)
router.get("/check-user", userAuth, sellerController.checkUser);
router.delete("/:id",userAuth,sellerController.sellerDelete)


module.exports=router