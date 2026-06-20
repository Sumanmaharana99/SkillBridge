import Session from "../models/Session.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Notification from "../models/Notifications.js";
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

        //Send Notificcation to mentor
        await Notification.create({
  userId: mentorId,

  type: "SESSION_BOOKED",

  message:
    "You received a new session booking request.",
});

        learner.credits -= 10;
        await learner.save();
        await Transaction.create({
            userId: req.user._id,
            amount: 10,
            type: "spent",
            sessionId: session._id,
            description: "Booked learning session"
        });
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
       
       //prevent duplicate credit bug
        if (
  req.body.status === "completed" &&
  session.status !== "completed"
) {
  const mentor = await User.findById(
    session.mentorId
  );

  mentor.credits += 10;

  await mentor.save();

  await Transaction.create({
    userId: session.mentorId,
    amount: 10,
    type: "earned",
    sessionId: session._id,
    description:
      "Completed teaching session",
  });
}
 session.status = req.body.status;
        await session.save();
        //SEND notification when session is accepted to the learner
      if (req.body.status ==="accepted") {
  await Notification.create({
    userId:
      session.learnerId,

    type:
      "SESSION_ACCEPTED",

    message:
      "Your session request has been accepted.",
  });
}

//SEND NOTIFICATION TO learner when session is marked completed by the Mentor
if (req.body.status ==="completed"
) {
  await Notification.create({
    userId:
      session.learnerId,

    type:
      "SESSION_COMPLETED",

    message:
      "Your session has been completed.",
  });
}
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