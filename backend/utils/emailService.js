import { google } from "googleapis";

// 1. Initialize the OAuth2 Client using your existing credentials
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

// 2. Set the refresh token
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

// 3. Initialize the Gmail API instance
const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export async function sendOtpEmail(toEmail, otp) {
  try {
    const subject = "Your Email Verification OTP";
    
    // Your exact HTML template
    const htmlContent = `
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
      `;

    // 4. Construct the raw email format required by the Gmail API
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
    const messageParts = [
      `From: "CashPilot" <${process.env.EMAIL_USER}>`,
      `To: ${toEmail}`,
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      htmlContent,
    ];
    const message = messageParts.join("\n");

    // 5. The Gmail API requires base64url encoding
    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // 6. Send the email via HTTP (Port 443), which Render CANNOT block
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("OTP email sent via Gmail API:", res.data.id);
    return res.data;
  } catch (error) {
    console.error("Send OTP Email Error:", error);
    throw error;
  }
}