const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendEmail = async (emailInfo) => {
  const { email, token, baseUrl, password } = emailInfo;
  try {
    const emailInfo = await transporter.sendMail({
      from: `"show what you want" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirm your email",
      html: `
        <p>You are receiving this email from <a href="${baseUrl}">SMS</a> because you have created an account. Follow the link to confirm your email before you can start to use your account fully.</p>
        <p>Click <a href="${baseUrl}/users/email/confirm?token=${token}" target="_blank">Confirm Email</a> to confirm your email or ignore this email if it was sent in error. This link is valid for 1 hour from the time of this email.</p> \n <p>Your temporary password is <strong>${password}</strong>.</p> \n\n <p><strong>Regards</strong></p><p>SMS Support.</p>
      `,
    });
    return emailInfo;
  } catch (error) {
    console.log(error);
  }
};
