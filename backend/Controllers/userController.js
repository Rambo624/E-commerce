
const User=require("../Models/userSchema")
const bcrypt=require("bcrypt")
const generateToken=require("../utils/tokens")
const { Cloudinary } = require("../utils/cloudinary-config")

const userSignup= async(req,res)=>{

    const {email,username,password}=req.body

if(!email || !username || !password)
{
return res.status(400).json("All fields are required")
}

const isUserExist= await User.findOne({email})

if(isUserExist)
    return res.json("user already Exists")


const saltRounds=10
const hash = bcrypt.hashSync(password, saltRounds);

    try {
        const newUser=await User.create({
            email,
            username,
            password:hash
        })
res.status(200).json("User created Successfully")


    } catch (error) {
        console.log(error)
    }
}


const userLogin= async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        res.status(401).json("all fields are required")
    }

    try {
        const user= await User.findOne({email}).lean()
if(!user){
    res.status(401).json("User doesnt Exist")

}

const hash=user.password

const userauth=bcrypt.compareSync(password, hash);

if(!userauth){
    return res.status(403).json("Invalid credentials")
}
const userwithoutPassword={...user}
delete userwithoutPassword.password
const token = generateToken(user._id)

res.cookie("token",token)

res.status(200).send(userwithoutPassword)

    } catch (error) {
        console.log(error)
    }

}

const userProfile=async(req,res)=>{
    const user=req.user
    console.log(user)

    const userData= await User.findOne({_id:user.id}).populate("orders").exec()
    if(!userData){
        return res.status(400).json("user not found")
}

res.send(userData)

}


/*const userProfile= async(req,res)=>{


    const user=req.user
    console.log(user)
const {id}=req.params
const userData= await User.findOne({_id:id})

if(!userData){
    return res.json("user not found")
}

res.send(userData)


}
*/

const userEdit=async(req,res)=>{
    let uploadUrl;
    const user=req.user
    if (req.file) {
        const uploadResult = await Cloudinary.uploader.upload(req.file.path)
            .catch((error) => {
                console.log(error,"===============");
            });


    
        uploadUrl = uploadResult.url
    }
const {email,username}=req.body
    const userData=await User.updateOne({_id:user.id},{$set:{email,username, profilepic:uploadUrl}},{new:true})
    if(!userData){
        return res.json("user not found")
    }

    res.send(userData)
}



const userDelete=async(req,res)=>{
    const user=req.user

    const removeUser= await User.deleteOne({_id:user.id})
if(!removeUser){
    return res.json("user not found")
}

res.send(removeUser)
    
}

const checkUser = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
          return  res.status(401).json({ success: false, message: "user not autherized" });
        }

        res.json({ success: true, message: "user autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


const userLogout=async(req,res)=>{

    try {
        res.clearCookie("token")
        res.json("user logged out successfully")
    } catch (error) {
        console.log(error)
    }


}


module.exports={userSignup,userLogin,userLogout,userProfile,userDelete,userEdit,checkUser}