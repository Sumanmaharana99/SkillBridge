import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js"
export const uploadAvatar=async(req,res)=>{
    try{
    if(!req.file){
        return res.status(200).json({
            success:false,
            message:"No file Uploaded"
        })
    }
    console.log(cloudinary.config());
    const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    )

    const user = await User.findByIdAndUpdate(req.user._id,{avatar:result.secure_url},{new:true});
    res.status(200).json({
      success: true,
      avatar: user.avatar,
    });
    }
    catch(error){
   res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}