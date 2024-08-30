const { Cloudinary } = require("../utils/cloudinary-config")
const Product = require("../Models/productSchema")

const createProduct = async (req, res) => {

    const { title, desc, price, thumbnail } = req.body
    let uploadUrl = {}
    if (!title || !desc || !price) {

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
            price
        })
        res.status(200).json("Product added successfully")

    } catch (error) {
        console.log(error)
    }



}

const getProducts = async (req, res) => {
    try {
        const product = await Product.find()
        if (product) {
            res.status(200).send(product)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}


const getProductById = async (req, res) => {
    try {

        const {id}=req.params
        const product = await Product.findById(id)
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
        const {  price, title, desc } = req.body
        if (req.file) {
            const uploadResult = await Cloudinary.uploader.upload(req.file.path)
                .catch((error) => {
                    console.log(error,"===============");
                });


            console.log(uploadResult);
            uploadUrl = uploadResult.url
        }
        const editproduct = await Product.findByIdAndUpdate( id , { thumbnail:uploadUrl, price, title, desc }, { new: true })
        if (editproduct) {
            res.status(200).send(editproduct)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}


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




module.exports = { createProduct, deleteProduct, getProducts, editProduct,getProductById }