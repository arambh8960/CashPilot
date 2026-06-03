import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Error connecting to Google OAuth:", error);
  } else {
    console.log("Server is ready to take our messages via Google OAuth");
  }
});

export async function sendOtpEmail(toEmail, otp) {
  try {
    const mailOptions = {
      from: `"CashPilot" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your Email Verification OTP",

      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:20px;">
          <h2>Verify your email</h2>

          <p>Your OTP is:</p>

          <div
            style="
              font-size:32px;
              font-weight:bold;
              letter-spacing:8px;
              background:#f5f5f5;
              padding:20px;
              text-align:center;
              border-radius:10px;
            "
          >
            ${otp}
          </div>

          <p style="margin-top:20px;">
            OTP will expire in 10 minutes.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("OTP email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Send OTP Email Error:", error);
    throw error;
  }
}