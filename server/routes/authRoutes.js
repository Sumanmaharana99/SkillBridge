import express from 'express';
import {register,login,getMe} from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';
import generateToken from '../utils/generateTokens.js';
import passport from 'passport'
const router = express.Router();

router.post('/register',register);
router.post('/login',login);    
router.get('/me',protect,getMe);

//google login
router.get("/google",passport.authenticate("google",{
    scope:["profile","email"]
}))

//google callback 
router.get("/google/callback",passport.authenticate("google",{
    session:false,failureRedirect:"/"
}),(req,res)=>{
    const token = generateToken(req.user._id)
    res.redirect( `https://skill-bridge-sage-three.vercel.app/oauth-success?token=${token}`)
})
export default router;