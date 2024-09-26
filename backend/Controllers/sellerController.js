
const User=require("../Models/sellerSchema")
const Admin=require("../Models/adminSchema")
const bcrypt=require("bcrypt")
const generateToken=require("../utils/tokens")


const sellerSignup= async(req,res)=>{

    const {email,username,password,role}=req.body

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
            password:hash,
            role,
          
        })
res.status(200).json("User created Successfully")


    } catch (error) {
        console.log(error)
    }
}


const sellerLogin = async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // Run both queries concurrently
        const [user, admin] = await Promise.all([
            User.findOne({ email }).lean(),
            Admin.findOne({ email: email }).lean()
        ]);

        // Check if neither user nor admin exists
        if (!user && !admin) {
            return res.status(401).json({ success: false, message: "User doesn't exist" });
        }

        let userauth = false;
        let adminauth = false;

        // Validate user credentials
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            userauth = isMatch;
        }

        // Validate admin credentials
        if (admin) {
            const isMatch = bcrypt.compareSync(password, admin.password);
            adminauth = isMatch;
        }

        // Check if credentials are valid
        if (!userauth && !adminauth) {
            return res.status(403).json({ success: false, message: "Invalid credentials" });
        }

        // Generate token and set cookie
        const token = generateToken(user ? user._id : admin._id, user ? user.role : 'admin');

        res.cookie("token", token,); // Set secure flag in production
const data= user?user:admin

        delete data.password
   
     
 
        res.status(200).json({ success: true, message: "Logged in successfully" ,role:user?user.role:"admin", data:data});

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const sellerProfile= async(req,res)=>{


    const seller=req.seller
    console.log(seller,"req.seller in sellerProfile")
const {id}=req.params
const userData= await User.findOne({_id:id})

if(!userData){
    return res.json("user not found")
}

res.send(userData)


}


const sellerEdit=async(req,res)=>{
    const {id}=req.params
const {email,username,profilepic}=req.body
    const userData=await User.updateOne({_id:id},{$set:{email,username,profilepic}},{new:true})
    if(!userData){
        return res.json("user not found")
    }

    res.send(userData)
}



const sellerDelete=async(req,res)=>{
    const {id}=req.params

    const removeUser= await User.deleteOne({_id:id})
if(!removeUser){
    return res.json("user not found")
}

res.send(removeUser)
    
}

const checkUser = async (req, res, next) => {
    try {
        const { seller } = req;
       // console.log(seller.role,"check user")
         if (seller.role !== "seller" && seller.role !== "admin") {
            res.status(401).json({ success: false, message: "user not autherized" });
        }

        res.json({ success: true, message: "user autherized",data:seller.role });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


const sellerLogout=async(req,res)=>{

    try {
        res.clearCookie("token")
        res.json("user logged out successfully")
    } catch (error) {
        console.log(error)
    }


}


module.exports={sellerSignup,sellerLogin,sellerLogout,sellerProfile,sellerDelete,sellerEdit,checkUser}