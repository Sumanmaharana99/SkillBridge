import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    mentorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    learnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    skill:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["pending",
        "accepted",
        "completed",
        "cancelled"],
        default:"pending"
    },
    creditsSpent: {
      type: Number,
      default: 10,
    },

},
{timestamps:true});

const Session = mongoose.model("Session",sessionSchema);

export default Session;