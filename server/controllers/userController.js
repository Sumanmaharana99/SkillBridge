import User from '../models/User.js';

const calculateProfileCompletion = (user) => {
  let completed = 0;
  const total = 6;

  if (user.name) completed++;
  if (user.bio) completed++;
  if (user.avatar) completed++;
  if (user.location) completed++;
  if (user.skillsTeach.length) completed++;
  if (user.skillsLearn.length) completed++;

  return Math.round((completed / total) * 100);
};

export const updateProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const {name,bio,skillsTeach,skillsLearn,location,availability,avatar} = req.body;

        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.skillsTeach = skillsTeach || user.skillsTeach;
        user.skillsLearn = skillsLearn || user.skillsLearn;
        user.location = location || user.location;
        user.availability = availability || user.availability;
        user.avatar = avatar || user.avatar;
        const updatedUser = await user.save();
        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user: updatedUser,
            profileCompletion: calculateProfileCompletion(updatedUser)
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error updating profile"
        })
    }
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const profileCompletion = calculateProfileCompletion(user);
    res.status(200).json({
      success: true,
      user,
      profileCompletion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const searchUsers = async (req, res) => {
    try{
        const {skill,location,minRating} = req.query;
        let query = {};
        if(skill){
            query.skillsTeach = {
                $regex: skill,
                $options: "i"
            }
        }
        if(location){
            query.location={
                $regex: location,
                $options: "i"
            }
        }
        if(minRating){
            query.rating = {
                $gte: Number(minRating)
            }
        }

         const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

        const users = await User.find(query).select("-password");

        res.status(200).json({
            success:true,
            count: users.length,
            page,
            users
        })
        
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error searching users"
        })
    }
}