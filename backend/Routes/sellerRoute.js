const express=require("express")
const router=express.Router()
const sellerController= require("../Controllers/sellerController")
const {sellerAuth}= require("../Middlewares/sellerAuth")

router.get("/",(req,res)=>{
    res.send("Hello user")
})

router.post("/signup", sellerController.sellerSignup)
router.post("/login",sellerController.sellerLogin)
router.post("/logout", sellerController.sellerLogout)
router.get("/profile/:id",sellerAuth,sellerController.sellerProfile)
router.put("/edit/:id",sellerAuth,sellerController.sellerEdit)
router.get("/check-user", sellerAuth, sellerController.checkUser);
router.delete("/:id",sellerAuth,sellerController.sellerDelete)
router.get("/check-user", sellerAuth, sellerController.checkUser);

module.exports=router