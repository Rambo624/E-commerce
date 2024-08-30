const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

const userAuth= (req,res,next)=>{


    try {
        
const {token}=req.cookies
if(!token){
    return  res.status(401).json("unauthorized access")
}

var tokenVerified = jwt.verify(token, process.env.JWT_KEY);
if(!tokenVerified){
    return  res.status(401).json("unauthorized access")
}

req.user=tokenVerified

next()

    } catch (error) {
        console.log(error)
    }
}

module.exports={userAuth}