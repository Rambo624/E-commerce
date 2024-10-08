const express=require("express")
const router=express.Router()
const productController= require("../Controllers/productController")
const {userAuth}=require("../Middlewares/userauth")
const {upload}=require("../Middlewares/multer")


router.post("/create",upload.single("thumbnail"),productController.createProduct)
router.delete("/delete/:id",productController.deleteProduct)
router.get("/getproducts",productController.getProducts)
router.put("/editproduct/:id",upload.single("thumbnail"),productController.editProduct)
router.get("/getproduct/:id",productController.getProductById)
router.post("/addreview/:id",userAuth,productController.addReview)
router.get("/getreview/:id",productController.getReview)

module.exports=router