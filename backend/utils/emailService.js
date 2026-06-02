import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(toEmail, otp) {
  try {
    console.log("Sending OTP to:", toEmail);

    const { data, error } = await resend.emails.send({
      from: "CashPilot <onboarding@resend.dev>",
      to: [toEmail],
      subject: "Your Email Verification OTP",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e5e5;border-radius:12px;">
          
          <h2 style="color:#1a1a1a;margin-bottom:8px;">
            Verify your email
          </h2>

          <p style="color:#555;margin-bottom:24px;">
            Use the OTP below to complete your registration.
            It expires in <strong>10 minutes</strong>.
          </p>

          <div style="background:#f5f5f5;border-radius:8px;padding:24px;text-align:center;letter-spacing:12px;font-size:36px;font-weight:700;color:#1a1a1a;">
            ${otp}
          </div>

          <p style="color:#999;font-size:13px;margin-top:24px;">
            If you did not request this, please ignore this email.
          </p>

        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw error;
    }

    console.log("OTP email sent successfully");
    console.log(data);

    return data;
  } catch (error) {
    console.error("Send OTP Email Error:", error);
    throw error;
  }
}