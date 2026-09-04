const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendResetPasswordEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
  const mailOptions = {
    from: `"HRD System" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Permintaan Reset Password Akun HRD',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Reset Password Akun Anda</h2>
        <p>Anda menerima email ini karena ada permintaan untuk mengatur ulang password akun Anda.</p>
        <p>Klik tautan di bawah ini untuk membuat password baru:</p>
        <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background-color:#0284c7;color:#fff;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>Jika Anda tidak merasa mengajukan ini, abaikan email ini.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetPasswordEmail };
