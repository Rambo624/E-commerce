const Order= require("../Models/orderSchema")
const User=require("../Models/userSchema")


const getOrder=async(req,res)=>{


const user=req.user
const orderDetails= await Order.find({user:user.id}).populate({
    path: 'products.product', // Path to the product field in the products array
    select: 'title price thumbnail' // Fields to return from the product model
  });
console.log(orderDetails)
if(!orderDetails){
    res.json({success:false})
}
res.json({success:true,data:orderDetails})
    


}



module.exports={getOrder}