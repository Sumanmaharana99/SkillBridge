import Transaction from "../models/Transaction.js";

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

      res.status(200).json({
        success: true,
        transactions,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };