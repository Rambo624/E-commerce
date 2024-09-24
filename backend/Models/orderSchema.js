const mongoose=require("mongoose")


const orderSchema= new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
},
sessionId:{
    type:String,
    required:true
},
products:[{
    product:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
        
    },
        stock:{
            type: Number,
            
        }
   },
],
totalamount:{
    type:Number,

},
status:{
    type:String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default:"pending"
},

createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },

})


module.exports=mongoose.model("order",orderSchema)