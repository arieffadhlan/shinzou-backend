const nodemailer = require("nodemailer");
const MAIL_SETTINGS = require("../../config/mail");

const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport(MAIL_SETTINGS);

  await transporter.sendMail({
    from: MAIL_SETTINGS.auth.user,
    to,
    subject,
    html
  });
}

module.exports = {
  sendMail
}