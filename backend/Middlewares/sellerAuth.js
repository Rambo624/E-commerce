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


if(tokenVerified.role!= "seller" && tokenVerified.role!= "admin"){
    return res.status(403).json({success:false, message:"only sellers and admins are authorised to access"})
}
req.seller=tokenVerified

next()

    } catch (error) {
        console.log(error)
    }
}

module.exports={sellerAuth}