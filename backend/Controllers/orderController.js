const Order= require("../Models/orderSchema")
const User=require("../Models/userSchema")


const createOrder=async(req,res)=>{

const {user,products,totalamount}=req.body

if(!user||!products||!totalamount){
    return res.status(400).json({success:false,message:"All fields are required"})
}

const newOrder= await Order.create({
    user,
    products: products.map(item => ({
        product: item.product,
        stock: item.stock
    })),
    totalamount
})

      // Update the user's orders array
      await User.findByIdAndUpdate(user, {
        $push: { orders: newOrder._id }
    });

    // Respond with the created order
    res.status(200).json({ success: true, message: "Order placed successfully", order: newOrder });


}

module.exports={createOrder}