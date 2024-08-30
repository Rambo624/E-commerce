const express=require("express")
const router=express.Router()
const productController= require("../Controllers/productController")
const {userAuth}= require("../Middlewares/userauth")
const {upload}=require("../Middlewares/multer")


router.post("/create",upload.single("thumbnail"),productController.createProduct)


module.exports=router