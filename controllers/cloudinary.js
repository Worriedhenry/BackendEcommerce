const cloudninary=require("cloudinary").v2

cloudninary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.API_SECRET
})

module.exports=cloudninary;