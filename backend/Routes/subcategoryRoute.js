const express=require("express")
const subController=require("../Controllers/subcategoryController")
const router=express.Router()

router.post("/createsub",subController.createsubCategory)




module.exports=router