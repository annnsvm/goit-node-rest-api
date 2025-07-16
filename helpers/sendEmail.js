import nodemailer from "nodemailer";

const { UKR_USER, UKR_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_USER,
    pass: UKR_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: UKR_USER,
    to,
    subject,
    html,
  });
};

export default sendEmail;