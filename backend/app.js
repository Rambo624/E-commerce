const express =require("express")
const dotenv=require("dotenv")
dotenv.config()
var cookieParser = require('cookie-parser')
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const cors=require("cors")
var app=express()
const userRoute= require("./Routes/userRoute")
const adminRoute=require("./Routes/adminRoute")
const productRoute=require("./Routes/productRouter")
const sellerRoute=require("./Routes/sellerRoute")
app.use(cors({
  credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use("/",userRoute)
app.use("/admin",adminRoute)
app.use("/seller",sellerRoute)
app.use("/product",productRoute)


mongoose.connect(process.env.MONGO_URI, {
  
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));
  

app.listen(3000, (req,res)=>{
console.log("Server running at port 3000")
})