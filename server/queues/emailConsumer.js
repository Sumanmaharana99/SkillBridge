import { getChannel } from "../config/rabbitmq.js";
import { sendEmail } from "../services/emailService.js";
export const consumeEmails = async () => {
  const channel = getChannel();
  channel.consume(
    "emailQueue",
    async (msg) => {
      if (!msg) return;

      const emailData = JSON.parse(
        msg.content.toString()
      );
      console.log(
        "Processing Email:",
        emailData
      );
      try {
        await sendEmail(emailData);
        channel.ack(msg);
      } catch (error) {
  console.error("Email sending failed:");
  console.error(error);

  channel.nack(msg, false, false);
}
    }
  );
};