import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateTokens.js';
import { sendEmailToQueue } from "../queues/emailProducer.js";
import { welcomeTemplate } from "../templates/welcomeEmail.js";
export const register = async (req, res) => {
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                succes:false,
                message:"User already exists"
            })
        }
        const hashsedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password: hashsedPassword
        })
        await sendEmailToQueue({
  to: user.email,

  subject: "Welcome to SkillBridge",

  message: welcomeTemplate(user),
});
        const token = generateToken(user._id);
        res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const login=async (req,res)=>{
    try{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(!user){
         return res.status(400).json({
        success:false,
        message:"Invalid Credentials"
      });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
        success:false,
        message:"Invalid Credentials"
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      success:true,
      token,
      user
    });
} catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}
export const getMe = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}