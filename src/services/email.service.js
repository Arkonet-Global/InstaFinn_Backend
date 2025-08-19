// src/services/email.service.js
const transporter = require('../config/email.config');
const { Verification_Email_Template } = require('../templates/emailTemplate');

const sendVerificationEmail = async (toEmail, otp) => {
  const htmlContent = Verification_Email_Template.replace('{verificationCode}', otp);

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: toEmail,
    subject: 'Your OTP Code - Arkonet Global',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📩 OTP email sent to ${toEmail}`);
  } catch (error) {
    console.error(`❌ Failed to send OTP email to ${toEmail}:`, error);
    throw new Error('Failed to send verification email');
  }
};

module.exports = { sendVerificationEmail };
