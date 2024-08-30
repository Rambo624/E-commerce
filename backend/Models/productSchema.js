const mongoose=require("mongoose")


const productSchema= new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true,
    minLength:8
},
profilepic:{
    type:String,
    default:"https://th.bing.com/th/id/OIP.w-L3HP_7QYalYXw7apT2tAHaHx?rs=1&pid=ImgDetMain"
},
role:{
    type:String,
    required:true
}

})


module.exports=mongoose.model("product",productSchema)