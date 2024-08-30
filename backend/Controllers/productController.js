const {Cloudinary}=require("../utils/cloudinary-config")
const Product=require("../Models/productSchema")

const createProduct= async(req,res)=>{

    const {title,desc,price,thumbnail}=req.body
let uploadUrl={}
if(!title || !desc ||!price ){

return res.status(401).json("all fields are required")

}

const productExist= await Product.findOne({title})

if(productExist){
    return res.json("product already Exists")
}

if(req.file){
    const uploadResult = await Cloudinary.uploader.upload(req.file.path)
    .catch((error) => {
        console.log(error);
    });
    
    
console.log(uploadResult);
uploadUrl=uploadResult.url
}
    




try {
    
const newProduct= await Product.create({
    title,
    desc,
    thumbnail:uploadUrl || "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg",
    price
})
res.status(200).json("Product added successfully")

} catch (error) {
    console.log(error)
}



}




module.exports={createProduct}