const Category=require("../Models/categorySchema")

const createCategory=async(req,res)=>{
    try {
        const {name,description}=req.body
        if(!name||!description){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
    
        const categoryexist= await Category.findOne({name})
        if(categoryexist){
            return res.status(400).json("Category already exist")
        }
    
    const newcategory= await Category.create({
        name,
        description,
        
        
    })
    res.status(200).json({success:true,message:"category added"})
    } catch (error) {
    res.json({message:error})
    }
  
}


module.exports={createCategory}