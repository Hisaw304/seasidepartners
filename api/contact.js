// /api/contact.js
const nodemailer = require("nodemailer");

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

module.exports = async (req, res) => {
  const startTs = Date.now();
  try {
    console.log("=== /api/contact invoked ===");
    console.log("Method:", req.method);

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      console.log("Rejected non-POST request");
      return res.status(405).json({ error: "Method not allowed. Use POST." });
    }

    // defensive body parse
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

    const ip =
      req.headers["x-forwarded-for"]?.split(",")?.[0]?.trim() ||
      req.socket?.remoteAddress ||
      "unknown";
    console.log("Request IP:", ip);

    // log incoming (sanitized) body for debugging — avoid logging sensitive info
    const safeBody = {
      name: body.name ? String(body.name).slice(0, 200) : undefined,
      email: body.email ? String(body.email).slice(0, 200) : undefined,
      phone: body.phone ? String(body.phone).slice(0, 50) : undefined,
      message:
        body.message && String(body.message).length > 0
          ? `${String(body.message).slice(0, 200)}${
              String(body.message).length > 200 ? " (truncated)" : ""
            }`
          : undefined,
    };
    console.log("Parsed body (sanitized preview):", safeBody);

    const { name, email, phone, message } = body || {};

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
      console.log("Validation failed:", errors);
      return res
        .status(422)
        .json({ error: "Validation failed", details: errors });
    }

    // Config from environment (Vercel .env)
    const host = process.env.SMTP_HOST || "mail.privateemail.com";
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    // port 465 => implicit SSL, otherwise use STARTTLS (secure false)
    const secure = port === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const CONTACT_TO = process.env.CONTACT_TO || "info@seasidepartners.org";
    const CONTACT_FROM =
      process.env.SMTP_FROM ||
      (smtpUser
        ? `"Seaside Partners" <${smtpUser}>`
        : `"Seaside Partners" <info@seasidepartners.org>`);
    const CONTACT_SUBJECT_PREFIX = "Seaside Partners –";
    const SEND_CLIENT_COPY = process.env.SEND_CLIENT_COPY !== "false"; // default true

    // Masked env logging for debugging
    console.log("SMTP host/port:", host, port);
    console.log("SMTP user present:", Boolean(smtpUser));
    console.log("SMTP pass present:", Boolean(smtpPass));
    console.log("CONTACT_TO:", CONTACT_TO);
    console.log("CONTACT_FROM resolved:", CONTACT_FROM);
    console.log(
      "TLS_REJECT_UNAUTHORIZED:",
      process.env.TLS_REJECT_UNAUTHORIZED || "unset (defaults to strict true)"
    );

    if (!host || !port || !smtpUser || !smtpPass) {
      console.error(
        "Missing SMTP config in environment (one or more required values missing)"
      );
      return res
        .status(500)
        .json({ error: "Server misconfigured. Contact admin." });
    }

    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure, // true for 465, false for 587
        auth: { user: smtpUser, pass: smtpPass },
        requireTLS: port === 587,
        // Fail fast in serverless
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
        tls: {
          // By default we want strict TLS. Set TLS_REJECT_UNAUTHORIZED=false in Vercel only for debugging.
          rejectUnauthorized: process.env.TLS_REJECT_UNAUTHORIZED !== "false",
        },
      });

      // Test whether transport object was created
      console.log("Transporter created. Transport options preview: ", {
        host,
        port,
        secure,
        requireTLS: port === 587,
      });
      // NOTE: avoid transporter.verify() in serverless — it can hang/time out
    } catch (err) {
      console.error("Failed creating transporter:", err && (err.stack || err));
      return res.status(500).json({ error: "Failed to initialize mailer." });
    }

    const adminSubject = `${CONTACT_SUBJECT_PREFIX} New contact form submission`;
    const adminHtml = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial; color:#111;">
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(sName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(sEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(sPhone)}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space:pre-wrap; border-left:2px solid #eee; padding-left:12px; margin-top:8px;">${escapeHtml(
          sMessage
        )}</div>
        <hr />
        <p style="font-size:12px;color:#666">Received: ${new Date().toISOString()}</p>
      </div>
    `;

    const fromAddr = CONTACT_FROM;

    // send admin email
    try {
      console.log(
        "Sending admin email to:",
        CONTACT_TO,
        "from:",
        fromAddr,
        "replyTo:",
        sEmail
      );
      const info = await transporter.sendMail({
        from: fromAddr,
        to: CONTACT_TO,
        replyTo: sEmail,
        subject: adminSubject,
        text: `New contact submission\n\nName: ${sName}\nEmail: ${sEmail}\nPhone: ${sPhone}\n\nMessage:\n${sMessage}\n\nReceived: ${new Date().toISOString()}`,
        html: adminHtml,
      });
      console.log("Admin email sent. nodemailer info:", {
        messageId: info && info.messageId,
        envelope: info && info.envelope,
        accepted: info && info.accepted,
        rejected: info && info.rejected,
      });
    } catch (err) {
      // log full details for debugging
      console.error("Error sending admin email:", {
        message: err && err.message,
        code: err && err.code,
        response: err && err.response,
        stack: err && err.stack,
      });
      // return helpful message to the frontend, but the logs contain details
      return res
        .status(500)
        .json({ error: "Failed to send email. See server logs for details." });
    }

    // optional client confirmation
    if (SEND_CLIENT_COPY && sEmail) {
      const clientSubject = `${CONTACT_SUBJECT_PREFIX} We received your message`;
      const clientHtml = `
        <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial; color:#111;">
          <p>Hi ${escapeHtml(sName)},</p>
          <p>Thanks for contacting Seaside Partners. This is a quick confirmation that we received your message. Our team will review and respond within 24–48 hours.</p>
          <hr />
          <p style="font-size:13px;color:#666">A copy of your message:</p>
          <div style="white-space:pre-wrap; border-left:2px solid #eee; padding-left:12px; margin-top:8px;">${escapeHtml(
            sMessage
          )}</div>
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
        .then((info) =>
          console.log("Client confirmation sent:", {
            to: sEmail,
            messageId: info && info.messageId,
          })
        )
        .catch((err) =>
          console.warn("Failed to send client confirmation:", {
            message: err && err.message,
            code: err && err.code,
            response: err && err.response,
          })
        );
    }

    const elapsed = Date.now() - startTs;
    console.log(`/api/contact completed in ${elapsed}ms`);
    return res
      .status(200)
      .json({ message: "Message sent. We will contact you shortly." });
  } catch (outerErr) {
    console.error(
      "Unhandled error in contact handler:",
      outerErr && (outerErr.stack || outerErr)
    );
    return res.status(500).json({ error: "Unexpected server error." });
  }
};
