
const {v2}=require("cloudinary")
const dotenv=require("dotenv")
dotenv.config()



    
 v2.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
    });

const Cloudinary=v2


    module.exports={Cloudinary}