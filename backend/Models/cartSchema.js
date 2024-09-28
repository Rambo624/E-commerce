const mongoose=require("mongoose")


const cartSchema= new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
            max:[10,"maximum 10 units in a single order"],
            default: 1,
          },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
        default: 0,
      },

},{timestamps:true})


module.exports=mongoose.model("cart",cartSchema)