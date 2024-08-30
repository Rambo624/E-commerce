const mongoose=require("mongoose")


const productSchema= new mongoose.Schema({

title:{
    type:String,
    required:true
},
desc:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true,
    min: [1, 'The number must be positive'], // Set minimum value to 1
},
thumbnail:{
    type:String,
    default:"https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg"
},


})


module.exports=mongoose.model("product",productSchema)