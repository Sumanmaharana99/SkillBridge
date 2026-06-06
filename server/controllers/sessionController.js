import Session from "../models/Session.js";
import User from "../models/User.js";

export const bookSession = async(req,res)=>{
    try{
        const {mentorId,skill,date} = req.body;
        if (mentorId === req.user._id.toString()) {
  return res.status(400).json({
    success: false,
    message: "You cannot book a session with yourself",
  });
}
        const learner = await User.findById(req.user._id);

        if(learner.credits < 10){
            return res.status(400).json({
                success:false,
                message:"Not enough credits to book session"
            })
        }
        const session = await Session.create({
            mentorId,
            learnerId: req.user._id,
            skill,
            date
        });
        learner.credits -= 10;
        await learner.save();
        res.status(201).json({
            success:true,
            message:"Session booked successfully",
            session
        })
    }
    catch(error){   
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const updateSessionStatus=async(req,res)=>{
    try{
        const session = await Session.findById(req.params.id);
        if (!session) {
          return res.status(404).json({
            success: false,
            message: "Session not found",
          });
        }
        if (session.mentorId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Only mentor can update session status",
      });
    }

    const allowedStatus = [
      "accepted",
      "completed",
      "cancelled",
    ];

    if (!allowedStatus.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }
        session.status = req.body.status;
        await session.save();
        res.status(200).json({
            success:true,
            message:"Session status updated successfully",
            session
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getMySessions = async(req,res)=>{
    try{
        const session = await Session.find({
            $or: [
            {
              mentorId: req.user._id,
            },
            {
              learnerId: req.user._id,
            },
          ], 
        })
        .populate(
            "mentorId",
            "name email"
          )
          .populate(
            "learnerId",
            "name email"
          );
        res.status(200).json({
            success:true,
            message:"Sessions retrieved successfully",
            sessions: session
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}