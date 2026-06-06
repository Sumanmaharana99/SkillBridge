import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    skillsTeach: {
  type: [String],
  default: [],
},

skillsLearn: {
  type: [String],
  default: [],
},
    credits: {
      type: Number,
      default: 100,
    },
    rating: {
      type: Number,
      default: 0,
    },
    avatar: {
  type: String,
  default: ""
},

location: {
  type: String,
  default: ""
},

availability: {
  type: String,
  default: ""
}
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;