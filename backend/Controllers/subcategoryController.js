const subCategory=require("../Models/subcategorySchema")

const createsubCategory=async(req,res)=>{
    try {
        const {name,maincategory}=req.body
        if(!name||!maincategory){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
    
        const subcategoryexist= await subCategory.findOne({name})
        if(subcategoryexist){
            return res.status(400).json("Category already exist")
        }
    
    const newsubcategory= await subCategory.create({
        name,
        maincategory,
        
        
    })
    res.status(200).json({success:true,message:"category added"})
    } catch (error) {
    res.json({message:error})
    }
  
}


module.exports={createsubCategory}