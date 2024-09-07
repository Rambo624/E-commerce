const mongoose=require("mongoose")

const subcategorySchema= new mongoose.Schema({

     
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: "" // Optional description for the sub-category
        },
        image: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg" // Default placeholder image
        },
        maincategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category", // Reference to the Category model
            required: true
        }
    },
{timestamps:true})

module.exports= mongoose.model("subcategory",subcategorySchema)