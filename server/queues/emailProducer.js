import { getChannel } from "../config/rabbitmq.js";

export const sendEmailToQueue = async (emailData) => {
  const channel = getChannel();
  channel.sendToQueue(
    "emailQueue",
    Buffer.from(JSON.stringify(emailData)),
    {
      persistent: true,
    }
  );

  console.log("Email Job Added to Queue");
};