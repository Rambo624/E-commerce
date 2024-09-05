const mongoose=require("mongoose")


const categorySchema= new mongoose.Schema({

category:{
    type:String,
    required:true,
    unique:true
},
thumbnail:{
    type:String,
    default:'https://img.freepik.com/premium-vector/modern-flat-icon-landscape_203633-11062.jpg'
}



})