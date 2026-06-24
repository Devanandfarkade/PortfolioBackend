import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_PORT === "465", // true for port 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("=========================================");
    console.error("SMTP Connection Verification FAILED:");
    console.error(error);
    console.error("=========================================");
  } else {
    console.log("=========================================");
    console.log("SMTP Connection Verification SUCCESSFUL");
    console.log(`Configured Sender: ${process.env.SMTP_USER}`);
    console.log("=========================================");
  }
});

/**
 * Sends a contact notification email formatted in the secure hacker template.
 * @param {Object} data
 * @param {string} data.name - Sender name
 * @param {string} data.email - Sender email
 * @param {string} data.subject - Message subject
 * @param {string} data.message - Message body
 * @param {string} data.ipAddress - Sender IP
 */
export async function sendContactEmail({ name, email, subject, message, ipAddress }) {
  const mailTo = process.env.EMAIL_TO || process.env.SMTP_USER || "devaapatil330@gmail.com";
  const mailSubject = `TRANSMISSION: ${subject || "CONTACT_MESSAGE"} [SECURE_SHELL]`;

  // Text version for clients that don't render HTML
  const textContent = `
=========================================
      INBOUND PORTFOLIO CONTACT LOG
=========================================
TIMESTAMP: ${new Date().toISOString()}
ROUTE_ID:  SYS_TRANS_PIPE_091
SENDER:    ${name}
REPLY_TO:  ${email}
IP_ROUTE:  ${ipAddress}
SUBJECT:   ${subject || "No Subject"}
=========================================

MESSAGE_BODY:
-----------------------------------------
${message}

-----------------------------------------
[END OF PACKET]
=========================================
`;

  // Styled HTML version mirroring the EmailTemplate.jsx aesthetic
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${mailSubject}</title>
</head>
<body style="background-color: #020308; color: #e6f7f4; font-family: 'Courier New', Courier, monospace; margin: 0; padding: 20px;">
  <div style="background-color: #070c19; border: 1px solid #00e5ff; border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 24px; box-shadow: 0 4px 20px rgba(0, 229, 255, 0.15); box-sizing: border-box;">
    
    <!-- Header HUD -->
    <div style="border-bottom: 1px solid rgba(0, 229, 255, 0.2); padding-bottom: 16px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="text-align: left; vertical-align: middle;">
            <div style="font-weight: bold; font-size: 14px; letter-spacing: 2px; color: #e6f7f4; margin: 0;">EMAIL_TEMPLATE_SPEC</div>
            <div style="font-size: 9px; color: #8da4a6; margin-top: 4px;">TEMPLATE_ID: template_cu3c3is | SECURE SYSTEM DISPATCH</div>
          </td>
          <td style="text-align: right; vertical-align: middle;">
            <span style="color: #39ff14; font-size: 9px; font-weight: bold; border: 1px solid #39ff14; padding: 4px 8px; border-radius: 4px; background-color: rgba(57, 255, 20, 0.05);">SECURE_LOG</span>
          </td>
        </tr>
      </table>
    </div>

    <p style="font-size: 11px; color: #8da4a6; margin-bottom: 20px; line-height: 1.5; text-align: left;">
      &gt; Incoming transmission logs successfully routed via portfolio handshake gateway. Dynamic binding parameters resolved.
    </p>

    <!-- Email Info Table -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #8da4a6; background-color: rgba(0, 0, 0, 0.4); border: 1px solid #0e1530; border-radius: 8px;">
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(14, 21, 48, 0.5); text-align: left;">TRANSMISSION_STATUS:</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(14, 21, 48, 0.5); text-align: right; color: #39ff14; font-weight: bold;">ROUTED_OK</td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(14, 21, 48, 0.5); text-align: left;">SENDER_IDENT:</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(14, 21, 48, 0.5); text-align: right; color: #ffffff; font-weight: bold;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(14, 21, 48, 0.5); text-align: left;">SENDER_EMAIL:</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(14, 21, 48, 0.5); text-align: right; color: #00e5ff; font-weight: bold;"><a href="mailto:${email}" style="color: #00e5ff; text-decoration: none;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(14, 21, 48, 0.5); text-align: left;">SUBJECT:</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(14, 21, 48, 0.5); text-align: right; color: #ffb700; font-weight: bold;">${subject || "No Subject"}</td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; text-align: left;">IP_ROUTING_ROUTE:</td>
        <td style="padding: 10px 14px; text-align: right; color: #ff007f; font-weight: bold;">${ipAddress}</td>
      </tr>
    </table>

    <!-- Message Body Container -->
    <div style="background-color: rgba(0, 0, 0, 0.3); padding: 16px; border-radius: 8px; border: 1px solid rgba(14, 21, 48, 0.8); margin-bottom: 20px; text-align: left;">
      <div style="font-size: 9px; color: #8da4a6; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: bold;">
        &gt; Message Payload
      </div>
      <div style="color: #e6f7f4; line-height: 1.6; font-size: 12px; margin: 0; white-space: pre-wrap; font-family: sans-serif;">${message}</div>
    </div>

    <!-- Footer -->
    <div style="font-size: 9px; text-align: center; color: rgba(141, 164, 166, 0.5); border-top: 1px solid rgba(14, 21, 48, 0.5); padding-top: 16px; line-height: 1.4;">
      This is an automated transmission from the portfolio contact node.<br />
      DO NOT REPLY DIRECTLY TO THIS SYSTEM MAIL. ROUTE CORRESPONDENCE TO SENDER EMAIL.
    </div>
  </div>
</body>
</html>
  `;

  // Send mail
  await transporter.sendMail({
    from: `"Devanand Core Router" <${process.env.SMTP_USER}>`,
    to: mailTo,
    replyTo: email, // enables direct reply to the sender
    subject: mailSubject,
    text: textContent,
    html: htmlContent,
  });
}

/**
 * Sends a handshake confirmation auto-reply email to the sender.
 * @param {Object} data
 * @param {string} data.name - Sender name
 * @param {string} data.email - Sender email
 * @param {string} data.subject - Original message subject
 */
export async function sendThankYouEmail({ name, email, subject }) {
  const mailSubject = `HANDSHAKE ACKNOWLEDGED: ${subject || "PORTFOLIO_CONTACT"}`;

  const textContent = `
=========================================
      TRANSMISSION ACKNOWLEDGED
=========================================
TIMESTAMP: ${new Date().toISOString()}
ROUTE_ID:  SYS_ACK_PIPE_882
RECIPIENT: ${name}
=========================================

Hello ${name},

This is an automated handshake acknowledgment from Devanand's portfolio routing gateway.

Your message packet has been successfully received, decapsulated, and logged. I will review your transmission and establish a response link shortly.

Thank you for connecting!

Best regards,
Devanand Farkade
Full-Stack Developer
-----------------------------------------
[HANDSHAKE QUEUED]
=========================================
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${mailSubject}</title>
</head>
<body style="background-color: #020308; color: #e6f7f4; font-family: 'Courier New', Courier, monospace; margin: 0; padding: 20px;">
  <div style="background-color: #070c19; border: 1px solid #39ff14; border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 24px; box-shadow: 0 4px 20px rgba(57, 255, 20, 0.15); box-sizing: border-box;">
    
    <!-- Header HUD -->
    <div style="border-bottom: 1px solid rgba(57, 255, 20, 0.2); padding-bottom: 16px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="text-align: left; vertical-align: middle;">
            <div style="font-weight: bold; font-size: 14px; letter-spacing: 2px; color: #e6f7f4; margin: 0;">DEVA_RESPONSE</div>
            <div style="font-size: 9px; color: #8da4a6; margin-top: 4px;">TRANSMISSION_ACK_ID: ack_${Math.random().toString(36).substring(2, 9)} | SECURE HANDSHAKE</div>
          </td>
          <td style="text-align: right; vertical-align: middle;">
            <span style="color: #39ff14; font-size: 9px; font-weight: bold; border: 1px solid #39ff14; padding: 4px 8px; border-radius: 4px; background-color: rgba(57, 255, 20, 0.05);">SYS_ACK</span>
          </td>
        </tr>
      </table>
    </div>

    <p style="font-size: 12px; color: #e6f7f4; margin-bottom: 20px; line-height: 1.6; text-align: left;">
      Hello <strong>${name}</strong>,<br/><br/>
      This is an automated handshake acknowledgment from Devanand's portfolio routing gateway.
    </p>

    <!-- Info Box -->
    <div style="background-color: rgba(0, 0, 0, 0.3); padding: 16px; border-radius: 8px; border: 1px solid rgba(57, 255, 20, 0.2); margin-bottom: 20px; text-align: left; font-size: 11px; line-height: 1.6;">
      &gt; Your message packet has been successfully received, decapsulated, and logged into the core database. I have queued a handshake handler. A secure connection link will be established soon.
    </div>

    <p style="font-size: 12px; color: #e6f7f4; margin-bottom: 24px; line-height: 1.6; text-align: left;">
      Thank you for connecting!<br/><br/>
      Best regards,<br/>
      <span style="color: #39ff14; font-weight: bold;">Devanand Farkade</span><br/>
      <span style="color: #8da4a6; font-size: 10px;">Full-Stack Developer</span>
    </p>

    <!-- Footer -->
    <div style="font-size: 9px; text-align: center; color: rgba(141, 164, 166, 0.4); border-top: 1px solid rgba(57, 255, 20, 0.1); padding-top: 16px; line-height: 1.4;">
      This is an automated handshake acknowledgement from the portfolio contact gateway.<br/>
      DO NOT REPLY DIRECTLY TO THIS MESSAGE.
    </div>
  </div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Devanand Farkade" <${process.env.SMTP_USER}>`,
    to: email,
    subject: mailSubject,
    text: textContent,
    html: htmlContent,
  });
}
