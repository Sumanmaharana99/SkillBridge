import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const sendEmail = async ({
  to,
  subject,
  message,
}) => {

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text: message,
  });

  console.log("Email Sent");
};