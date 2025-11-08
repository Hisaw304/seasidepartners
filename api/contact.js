// /api/contact.js
import nodemailer from "nodemailer";

function sanitize(input = "") {
  return String(input)
    .replace(/<[^>]*>?/gm, "")
    .trim();
}
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  const startTs = Date.now();
  try {
    console.log("=== /api/contact invoked ===");
    console.log("Method:", req.method);

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed. Use POST." });
    }

    // Parse request body safely
    let body;
    try {
      body =
        typeof req.body === "string"
          ? JSON.parse(req.body || "{}")
          : req.body || {};
    } catch (parseErr) {
      console.error("Failed to parse JSON body:", parseErr);
      return res.status(400).json({ error: "Invalid JSON body." });
    }

    const { name, email, phone, message } = body;
    const sName = sanitize(name || "");
    const sEmail = sanitize(email || "");
    const sPhone = sanitize(phone || "");
    const sMessage = sanitize(message || "");

    // Validation
    const errors = {};
    if (!sName || sName.length < 2) errors.name = "Please provide your name.";
    if (!sEmail || !validEmail(sEmail))
      errors.email = "Please provide a valid email.";
    if (!sPhone || sPhone.length < 6)
      errors.phone = "Please provide a phone number.";
    if (!sMessage || sMessage.length < 10)
      errors.message = "Please provide a short description.";

    if (Object.keys(errors).length > 0) {
      console.log("Validation failed:", errors);
      return res
        .status(422)
        .json({ error: "Validation failed", details: errors });
    }

    // Environment config
    const host = process.env.SMTP_HOST || "mail.privateemail.com";
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const secure = port === 465; // true for implicit SSL
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const CONTACT_TO = process.env.CONTACT_TO || "info@seasidepartners.org";
    const CONTACT_FROM =
      process.env.SMTP_FROM ||
      (smtpUser
        ? `"Seaside Partners" <${smtpUser}>`
        : `"Seaside Partners" <info@seasidepartners.org>`);
    const CONTACT_SUBJECT_PREFIX = "Seaside Partners –";
    const SEND_CLIENT_COPY = process.env.SEND_CLIENT_COPY !== "false";

    console.log("SMTP settings:", {
      host,
      port,
      secure,
      smtpUser: !!smtpUser,
      smtpPass: !!smtpPass,
    });

    if (!host || !port || !smtpUser || !smtpPass) {
      console.error("Missing SMTP config");
      return res
        .status(500)
        .json({ error: "Server misconfigured. Contact admin." });
    }

    // Create transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user: smtpUser, pass: smtpPass },
        requireTLS: port === 587,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
        tls: {
          rejectUnauthorized: process.env.TLS_REJECT_UNAUTHORIZED !== "false",
        },
      });
      console.log("Transporter created successfully.");
    } catch (err) {
      console.error("Failed creating transporter:", err);
      return res.status(500).json({ error: "Failed to initialize mailer." });
    }

    // Send admin email
    const adminSubject = `${CONTACT_SUBJECT_PREFIX} New contact form submission`;
    try {
      const info = await transporter.sendMail({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: sEmail,
        subject: adminSubject,
        text: `New contact from ${sName} (${sEmail})\nPhone: ${sPhone}\n\n${sMessage}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(sName)}</p>
               <p><strong>Email:</strong> ${escapeHtml(sEmail)}</p>
               <p><strong>Phone:</strong> ${escapeHtml(sPhone)}</p>
               <p><strong>Message:</strong><br/>${escapeHtml(sMessage)}</p>`,
      });
      console.log("Admin email sent:", info?.messageId);
    } catch (err) {
      console.error("Error sending admin email:", err);
      return res.status(500).json({ error: "Failed to send admin email." });
    }

    // Send user confirmation
    if (SEND_CLIENT_COPY && sEmail) {
      transporter
        .sendMail({
          from: CONTACT_FROM,
          to: sEmail,
          replyTo: CONTACT_TO,
          subject: `${CONTACT_SUBJECT_PREFIX} We received your message`,
          text: `Hi ${sName},\n\nThanks for reaching out to Seaside Partners. We received your message:\n\n${sMessage}\n\nWe'll get back to you within 24–48 hours.`,
          html: `<p>Hi ${escapeHtml(sName)},</p>
                 <p>Thanks for contacting Seaside Partners. We’ve received your message and will respond soon.</p>
                 <hr/>
                 <p><strong>Your message:</strong></p>
                 <div>${escapeHtml(sMessage)}</div>`,
        })
        .then(() => console.log("Confirmation email sent to client:", sEmail))
        .catch((err) =>
          console.warn("Failed to send confirmation to client:", err.message)
        );
    }

    console.log(`/api/contact completed in ${Date.now() - startTs}ms`);
    return res.status(200).json({ message: "Message sent successfully." });
  } catch (outerErr) {
    console.error("Unhandled error:", outerErr);
    return res.status(500).json({ error: "Unexpected server error." });
  }
}
