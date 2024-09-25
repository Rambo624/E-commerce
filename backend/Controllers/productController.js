const { Cloudinary } = require("../utils/cloudinary-config")
const Product = require("../Models/productSchema")
const Review= require("../Models/reviewSchema")
const createProduct = async (req, res) => {

    const { title, desc, price,stock,category,subcategory,seller } = req.body
    let uploadUrl = ""
    if (!title || !desc || !price||!stock||!category||!subcategory) {

        return res.status(401).json("all fields are required")

    }

    const productExist = await Product.findOne({ title })

    if (productExist) {
        return res.json("product already Exists")
    }

    if (req.file) {
        const uploadResult = await Cloudinary.uploader.upload(req.file.path)
            .catch((error) => {
                console.log(error);
            });


        console.log(uploadResult);
        uploadUrl = uploadResult.url
    }

    try {

        const newProduct = await Product.create({
            title,
            desc,
            thumbnail: uploadUrl || "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg",
            price,
            stock,
            category,
            subcategory,
            seller
        })
        res.status(200).json("Product added successfully")

    } catch (error) {
        console.log(error)
    }



}

const getProducts = async (req, res) => {
    try {
        const product = await Product.find().populate('category',"name").populate('subcategory','name').exec()
        if (product) {
            res.status(200).send(product)
        }
    } catch (error) {
        res.status(400).json({message:error})
    }
}


const getProductById = async (req, res) => {
    try {

        const {id}=req.params
        const product = await Product.findById(id).populate('category','name').populate('subcategory',"name").exec()
        if (product) {
            res.status(200).send(product)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}


const editProduct = async (req, res) => {
    try {
        let uploadUrl;
        const { id } = req.params
        const {  price, title, desc ,stock,subcategory,category} = req.body
        if (req.file) {
            const uploadResult = await Cloudinary.uploader.upload(req.file.path)
                .catch((error) => {
                    console.log(error,"===============");
                });


            console.log(uploadResult);
            uploadUrl = uploadResult.url
        }
        const editproduct = await Product.findByIdAndUpdate( id , { thumbnail:uploadUrl, price, title, desc,stock,subcategory,category }, { new: true })
        if (editproduct) {
            res.status(200).send(editproduct)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const addReview= async(req,res)=>{

const user=req.user
const {id}=req.params
const {product,comment,title,rating}=req.body
if(!rating){
    return res.json({success:false,message:"rating is required"})
}
const review=new Review({
product,
user:user.id,
rating,
comment,
title,
rating
})
   await review.save() 
res.json({success:true,data:review})



}
const getReview = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch reviews for the given product ID and populate user information
        const reviews = await Review.find({ product: id }).populate("user", "username").lean();

        // Check if there are no reviews
        if (reviews.length === 0) {
            return res.json({ success: false, message: 'No reviews found' });
        }

        // Send success response with reviews data
        res.json({ success: true, data: reviews });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params


        const removeProduct = await Product.findByIdAndDelete({ _id: id })
        res.status(200).send(removeProduct)

        if (!removeProduct) {
            return res.status(400).json("Product not found")
        }
    } catch (error) {
        res.json(error)
    }


}




module.exports = { createProduct, deleteProduct, getProducts, editProduct,getProductById ,addReview,getReview}