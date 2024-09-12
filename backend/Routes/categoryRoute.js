const express=require("express")
const categoryController=require("../Controllers/categoryController")
const router=express.Router()
const {upload}= require("../Middlewares/multer")
router.post("/createcategory",upload.single('image'),categoryController.createCategory)
router.get("/categories",categoryController.getCategories)
router.put("/editcategory/:id", upload.single('image') , categoryController.editCategory)
router.delete("/delete/:id",categoryController.removeCategory)



module.exports=router