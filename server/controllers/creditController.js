import Transaction from "../models/Transaction.js";
import User from "../models/User.js"
export const getCreditHistory =
  async (req, res) => {
    try {
      const transactions =
        await Transaction.find({
          userId: req.user._id,
        })
          .populate(
            "sessionId",
            "skill status"
          )
          .sort({ createdAt: -1 });

       const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      credits: user.credits,
      transactions,
    });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };