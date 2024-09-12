const mongoose=require("mongoose")


const userSchema= new mongoose.Schema({

username:{
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
    default:"user"
},
cart:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"cart"
},
address: [{
    name:{type:String,trim:true},
    House: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    pin: { type:Number, trim: true },
  }],
orders:[{
    type:mongoose.Schema.Types.ObjectId,
ref:"order"
}],


},{timestamps:true})


module.exports=mongoose.model("user",userSchema)