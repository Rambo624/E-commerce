
const admin=require("../Models/adminSchema")
const bcrypt=require("bcrypt")
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

const token = generateToken(user._id,)

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


const adminEdit=async(req,res)=>{
    const {id}=req.params
const {email,name,profilepic}=req.body
    const userData=await admin.updateOne({_id:id},{$set:{email,name,profilepic}},{new:true})
    if(!userData){
        return res.json("user not found")
    }

    res.send(userData)
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


module.exports={adminSignup,adminLogin,adminLogout,adminProfile,adminDelete,adminEdit,checkUser}