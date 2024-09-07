const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

const sellerAuth= (req,res,next)=>{


    try {
        
const {token}=req.cookies
if(!token){
    return  res.status(401).json("unauthorized access")
}

var tokenVerified = jwt.verify(token, process.env.JWT_KEY);
if(!tokenVerified){
    return  res.status(403).json("unauthorized access")
}

console.log(tokenVerified.role,"haai")
if(tokenVerified.role!= "seller"){
    return res.status(403).json({success:false, message:"only sellers are authorised to access"})
}
req.seller=tokenVerified

next()

    } catch (error) {
        console.log(error)
    }
}

module.exports={sellerAuth}