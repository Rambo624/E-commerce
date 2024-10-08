const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category",
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subcategory",
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min:[0,"The number must be positive"]
    },

    price: {
        type: Number,
        required: true,
        min: [1, 'The number must be positive'], // Set minimum value to 1
    },
    thumbnail: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg"
    },
   /* seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"seller",
        required:true
    },*/
  review:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Review"
  },
      seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"seller",
        required:true
      },
      AvgRating:{
        type:Number,
        min:1,
        max:5,
        default:1
      }


}, { timestamps: true })


module.exports = mongoose.model("product", productSchema)