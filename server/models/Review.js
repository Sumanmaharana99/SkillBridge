import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    mentorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    learnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    sessionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Session",
        required:true,
        unique:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    review:{
        type:String,
        default:"",
    },

},{timestamps:true});

const Review = mongoose.model("Review",reviewSchema);
export default Review;