import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
      },

      type: {
        type: String,
        enum: [
          "SESSION_BOOKED",
          "SESSION_ACCEPTED",
          "SESSION_COMPLETED",
          "REVIEW_RECEIVED",
          "CREDITS_EARNED",
        ],
      },

      message: {
        type: String,
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Notification",
  notificationSchema
);