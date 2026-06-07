import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   amount:{
    type:Number,
    required:true
   },
   type:{
    type:String,
      enum: ["earned", "spent"],
    required:true
   },
   sessionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Session",
   },
   description:{
    type:String,
    default:""
   }
},{timestamps:true});

const Transaction = mongoose.model("Transaction",transactionSchema);

export default Transaction;