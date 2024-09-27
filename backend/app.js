const express =require("express")
const dotenv=require("dotenv")
dotenv.config()
var cookieParser = require('cookie-parser')
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const cors=require("cors")
var app=express()
const categoryRoute=require("./Routes/categoryRoute")
const userRoute= require("./Routes/userRoute")
const adminRoute=require("./Routes/adminRoute")
const productRoute=require("./Routes/productRouter")
const sellerRoute=require("./Routes/sellerRoute")
const cartRoute=require("./Routes/cartRoute")
const subRoute=require("./Routes/subcategoryRoute")
const orderRoute=require("./Routes/orderRoute")
// CORS options configuration
const allowedOrigins = [
  'http://localhost:5173', // Local development
"https://e-commerce-frontend-ten-neon.vercel.app"
];

// CORS options configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json())
app.use("/",userRoute)
app.use("/admin",adminRoute)
app.use("/seller",sellerRoute)
app.use("/product",productRoute)
app.use("/cart",cartRoute)
app.use("/category",categoryRoute)
app.use("/sub",subRoute)
app.use("/order",orderRoute)
//app-use("/category",categoryRoute)
mongoose.connect(process.env.MONGO_URI, {
  
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));
  

app.listen(3000, (req,res)=>{
console.log("Server running at port 3000")
})