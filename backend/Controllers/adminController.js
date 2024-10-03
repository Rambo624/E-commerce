
const admin=require("../Models/adminSchema")
const User=require("../Models/userSchema")
const Order=require("../Models/orderSchema")
const bcrypt=require("bcrypt")
const Seller=require("../Models/sellerSchema")
const generateToken=require("../utils/tokens")


const adminSignup= async(req,res)=>{

    const {email,name,password,role}=req.body

if(!email || !name || !password ||!role)
{
return res.status(400).json("All fields are required")
}

const isUserExist= await admin.findOne({email})

if(isUserExist)
    return res.json("user already Exists")


const saltRounds=10
const hash = bcrypt.hashSync(password, saltRounds);

    try {
        const newUser=await admin.create({
            email,
            name,
            password:hash,
            role
        })
res.status(200).json("admin created Successfully")


    } catch (error) {
        console.log(error)
    }
}


const adminLogin= async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        res.status(401).json("all fields are required")
    }

    try {
        const user= await admin.findOne({email})
if(!user){
    res.status(401).json("admin doesnt Exist")

}
const hash=user.password

const userauth=bcrypt.compareSync(password, hash);

if(!userauth){
    return res.status(403).json("Invalid credentials")
}

const token = generateToken(user._id,user.role)

res.cookie("token",token)

res.status(200).json("logged in successfully")

    } catch (error) {
        console.log(error)
    }

}

const adminProfile= async(req,res)=>{


    const user=req.user
    console.log(user)
const {id}=req.params
const userData= await admin.findOne({_id:id})

if(!userData){
    return res.json("user not found")
}

res.send(userData)


}

const getUsers=async(req,res)=>{
    const admin=req.seller
  if(admin.role !="admin"){
    return res.json({success:false,message:"Unauthorized"})
  }

    const userData= await User.find()
    if(!userData){
        return res.status(400).json("users not found")
}

res.json({success:true,data:userData})

}

const getSellers=async(req,res)=>{
    const admin=req.seller
  if(admin.role !="admin"){
    return res.json({success:false,message:"Unauthorized"})
  }

    const userData= await Seller.find()
    if(!userData){
        return res.status(400).json("users not found")
}

res.json({success:true,data:userData})

}

const adminEdit=async(req,res)=>{
    const {id}=req.params
const {email,name,profilepic}=req.body
    const userData=await admin.updateOne({_id:id},{$set:{email,name,profilepic}},{new:true})
    if(!userData){
        return res.json("user not found")
    }

    res.send(userData)
}




const getOrders=async (req,res)=>{
    try {
        const orderDetails=await Order.find().populate("products.product").populate({path:"user", select:"username email"}).lean()
        if(!orderDetails){
            return res.json({success:false,message:"No orders Found"})
        }
        res.json({success:true,data:orderDetails})
    } catch (error) {
        console.log(error)
    }
}

const verifyOrder= async (req,res)=>{
    try {
        const {id}=req.params
       const orderDetails= await Order.findByIdAndUpdate(id,{status:"order verified"},{new:true})
       if(!orderDetails){
        return res.json({success:false,message:"Order not found"})
       }
       res.status(200).json({ message: 'Order status updated', data: orderDetails });
    } catch (error) {
        console.log(error)
    }
}

const adminDelete=async(req,res)=>{
    const {id}=req.params

    const removeUser= await admin.deleteOne({_id:id})
if(!removeUser){
    return res.json("user not found")
}

res.send(removeUser)
    
}

const checkUser = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            res.status(401).json({ success: false, message: "user not autherized" });
        }

        res.json({ success: true, message: "user autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


const adminLogout=async(req,res)=>{

    try {
        res.clearCookie("token")
        res.json("user logged out successfully")
    } catch (error) {
        console.log(error)
    }


}

const blockUser = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id, "Hello");
  
      // Fetch the current state of isBlocked for both User and Seller
      const [user, seller] = await Promise.all([
        User.findById(id).lean(),
        Seller.findById(id).lean(),
      ]);
  
      // Check if neither user nor seller is found
      if (!user && !seller) {
        return res.status(404).json({ success: false, message: "User or Seller not found" });
      }
  
      // Determine which object to update and toggle the isBlocked field
      const target = user || seller; // Use user if found, otherwise use seller
      const newIsBlocked = !target.isBlocked; // Toggle the current isBlocked value
  
      // Update the isBlocked field for the found user or seller
     const userDetails= await (user
        ? User.findByIdAndUpdate(id, { $set: { isBlocked: newIsBlocked } },{new:true})
        : Seller.findByIdAndUpdate(id, { $set: { isBlocked: newIsBlocked }, },{new:true}));
  
      res.status(200).json({ success: true,data:newIsBlocked,user:userDetails, message: `User ${newIsBlocked ? 'Blocked' : 'Unblocked'} successfully` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  };
  

 /* const blockUser=async (req,res)=>{
    try {
        const {id}=req.params
        console.log(id,"Hello")
    } catch (error) {
       console.log(error) 
    }
  }*/

module.exports={adminSignup,adminLogin,adminLogout,adminProfile,adminDelete,adminEdit,checkUser,getUsers,blockUser,getOrders,verifyOrder,getSellers,blockUser}