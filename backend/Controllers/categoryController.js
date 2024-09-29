const Category=require("../Models/categorySchema")
const {Cloudinary}= require("../utils/cloudinary-config")



const createCategory=async(req,res)=>{
    try {
        const {name,description,image}=req.body
        let uploadUrl="";
        if(req.file){
            const uploadResult = await Cloudinary.uploader.upload(req.file.path)
            .catch((error) => {
                console.log(error,"===============");
            });


        console.log(uploadResult);
        uploadUrl = uploadResult.url
        }
        if(!name||!description){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
    
        const categoryexist= await Category.findOne({name})
        if(categoryexist){
            return res.json({message:"Category already exist"})
        }
    
    const newcategory= await Category.create({
        name,
        description,
        image:uploadUrl
        
        
    })
    res.status(200).json({success:true,message:"category added"})
    } catch (error) {
    res.json({message:error})
    }
  
}


const getCategories=async(req,res)=>{

try {
    
const category = await Category.find()
if(!category){
    return res.status(400).json({success:false,message:"categories not found"})
}

res.status(200).json({success:true,data:category})

} catch (error) {
    console.log(error)
}

}

const editCategory=async(req,res)=>{
    try {
        const {id}=req.params
        let uploadUrl="";
const {name,description,image}=req.body
        if(req.file){
            const uploadResult = await Cloudinary.uploader.upload(req.file.path)
            .catch((error) => {
                console.log(error,"===============");
            });


        console.log(uploadResult);
        uploadUrl = uploadResult.url
        }


   const category = await Category.findByIdAndUpdate(id,{$set:{name,description,image:uploadUrl}},{new:true})
   if(!category){
    return res.status(400).json({success:false,message:"categories not found"})
}
res.status(200).json({success:true,data:category})


    } catch (error) {
        console.log(error)
    }
}


const removeCategory=async(req,res)=>{
    try {
       const {id}=req.params
       const category= await Category.findByIdAndDelete(id) 
       if(!category){
        return res.status(400).json("category not found")
       }
       return res.status(200).json({message:"category removed",data:category})

    } catch (error) {
        
    }
}

module.exports={createCategory,getCategories,editCategory,removeCategory}