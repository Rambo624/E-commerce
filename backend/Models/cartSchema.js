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
            default: 1,
          },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
        default: 0,
      },

})


module.exports=mongoose.model("cart",cartSchema)