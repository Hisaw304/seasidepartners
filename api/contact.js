const nodemailer = require("nodemailer");

function sanitize(input = "") {
  return String(input)
    .replace(/<[^>]*>?/gm, "")
    .trim();
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { name, email, phone, message } = req.body || {};

  const sName = sanitize(name || "");
  const sEmail = sanitize(email || "");
  const sPhone = sanitize(phone || "");
  const sMessage = sanitize(message || "");

  const errors = {};
  if (!sName || sName.length < 2) errors.name = "Please provide your name.";
  if (!sEmail || !validEmail(sEmail))
    errors.email = "Please provide a valid email address.";
  if (!sPhone || sPhone.length < 6)
    errors.phone = "Please provide a phone number.";
  if (!sMessage || sMessage.length < 10)
    errors.message = "Please provide a short description of your case.";

  if (sName.length > 200) errors.name = "Name too long.";
  if (sEmail.length > 200) errors.email = "Email too long.";
  if (sPhone.length > 50) errors.phone = "Phone too long.";
  if (sMessage.length > 5000) errors.message = "Message too long.";

  if (Object.keys(errors).length > 0) {
    return res
      .status(422)
      .json({ error: "Validation failed", details: errors });
  }

  // ✅ Hardcoded production-safe defaults for Seaside Partners
  const host = "mail.privateemail.com";
  const port = 587;
  const secure = true;
  const CONTACT_TO = "info@seasidepartners.org";
  const CONTACT_FROM = `"Seaside Partners" <info@seasidepartners.org>`;
  const CONTACT_SUBJECT_PREFIX = "Seaside Partners –";
  const SEND_CLIENT_COPY = true;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("Missing SMTP_USER or SMTP_PASS");
    return res
      .status(500)
      .json({ error: "Server misconfigured. Contact admin." });
  }

  let transporter;
  try {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
  } catch (err) {
    console.error("SMTP connection/verification error:", err.message || err);
    return res
      .status(500)
      .json({ error: "Could not connect to email server." });
  }

  const adminSubject = `${CONTACT_SUBJECT_PREFIX} New contact form submission`;
  const adminHtml = `
    <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial; color:#111;">
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${sName}</p>
      <p><strong>Email:</strong> ${sEmail}</p>
      <p><strong>Phone:</strong> ${sPhone}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space:pre-wrap; border-left:2px solid #eee; padding-left:12px; margin-top:8px;">${sMessage}</div>
      <hr />
      <p style="font-size:12px;color:#666">Received: ${new Date().toISOString()}</p>
    </div>
  `;

  const fromAddr = CONTACT_FROM;

  try {
    await transporter.sendMail({
      from: fromAddr,
      to: CONTACT_TO,
      replyTo: sEmail,
      subject: adminSubject,
      text: `New contact submission\n\nName: ${sName}\nEmail: ${sEmail}\nPhone: ${sPhone}\n\nMessage:\n${sMessage}\n\nReceived: ${new Date().toISOString()}`,
      html: adminHtml,
    });
  } catch (err) {
    console.error("Error sending admin email:", err.message || err);
    return res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }

  if (SEND_CLIENT_COPY) {
    const clientSubject = `${CONTACT_SUBJECT_PREFIX} We received your message`;
    const clientHtml = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial; color:#111;">
        <p>Hi ${sName},</p>
        <p>Thanks for contacting Seaside Partners. This is a quick confirmation that we received your message. Our team will review and respond within 24–48 hours.</p>
        <hr />
        <p style="font-size:13px;color:#666">A copy of your message:</p>
        <div style="white-space:pre-wrap; border-left:2px solid #eee; padding-left:12px; margin-top:8px;">${sMessage}</div>
        <p style="font-size:12px;color:#666">If you did not submit this request, please ignore this message.</p>
      </div>
    `;

    transporter
      .sendMail({
        from: fromAddr,
        to: sEmail,
        replyTo: CONTACT_TO,
        subject: clientSubject,
        text: `Thanks ${sName},\n\nWe received your message and will get back to you soon.\n\nYour message:\n${sMessage}`,
        html: clientHtml,
      })
      .catch((err) =>
        console.warn("Failed to send client copy:", err.message || err)
      );
  }

  return res
    .status(200)
    .json({ message: "Message sent. We will contact you shortly." });
};
