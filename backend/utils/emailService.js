import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpEmail(toEmail, otp) {
  try {
    console.log("Sending OTP to:", toEmail);

    const info = await transporter.sendMail({
      from: '"CashPilot" <arambh.tiwari11@gmail.com>',
      to: toEmail,
      subject: "Verify Your Email - CashPilot",

      html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:20px">
        
        <h2>Verify your email</h2>

        <p>
          Thanks for signing up on CashPilot.
        </p>

        <p>
          Your OTP is:
        </p>

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

        <p style="margin-top:20px">
          OTP will expire in 10 minutes.
        </p>

      </div>
      `,
    });

    console.log("Email sent successfully");
    console.log(info);

    return info;
  } catch (error) {
    console.error("Send OTP Email Error:", error);
    throw error;
  }
}