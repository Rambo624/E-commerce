const mongoose=require("mongoose")


const orderSchema= new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
},
products:[{
    product:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
        stock:{
            type: Number,
            required:true
        }
   },
],
totalamount:{
    type:Number,
    required:true
},
status:{
    type:String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default:"pending"
},
coupon:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"coupon",
    default:null
},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },

})


module.exports=mongoose.model("order",orderSchema)