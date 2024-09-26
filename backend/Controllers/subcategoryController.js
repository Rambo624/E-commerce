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


const getSub= async (req,res)=>{

const sub= await subCategory.find().populate("maincategory").lean()
if(!sub){
    return res.status(400).json({success:false, message:"Internal server error"})
}
res.status(200).json({success:true, data:sub})
}

module.exports={createsubCategory,getSub}