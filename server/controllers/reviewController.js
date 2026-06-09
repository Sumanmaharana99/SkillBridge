import Review from "../models/Review.js";
import Session from "../models/Session.js";
import User from "../models/User.js";

export const createReview = async(req,res)=>{
    try{
        const {sessionId,rating,review} = req.body;
        const session = await Session.findById(sessionId);
        if(!session){
            return res.status(404).json({
                success:false,
                message:"Session not found"
            })
        }
        if(session.learnerId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to review this session Only the learner can review the session"
            })
        }
        if(session.status!=="completed"){
           return res.status(400).json({
            success:false,
            message:"Cannot review session that is not completed"
           }) 
        }  
        const existingReview = await Review.findOne({sessionId});

        if(existingReview){
            return res.status(400).json({
                success:false,
                message:"You have already reviewed this session"
            })
        }
        const newReview = await Review.create({
            mentorId:session.mentorId,
            learnerId:session.learnerId,
            sessionId,
            rating,
            review
        })
        const reviews = await Review.find({
  mentorId: session.mentorId,
});
        const avgRating = reviews.reduce((sum,item)=>sum+item.rating,0)/reviews.length;

        await User.findByIdAndUpdate(session.mentorId,{rating:avgRating.toFixed(1)});
         res.status(201).json({
        success:true,
        message:"Review created successfully", 
    })
    }
    catch(error){
        console.error("Error creating review:",error);
        res.status(500).json({
            success:false,
            message:"An error occurred while creating the review"
        })
    }
}
export const getMentorReviews =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          mentorId:
            req.params.mentorId,
        })
          .populate(
            "learnerId",
            "name"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        reviews,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };