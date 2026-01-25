import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting: Track submissions per email (in-memory, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // Max messages per email
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function checkRateLimit(email: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const normalizedEmail = email.toLowerCase();
  const record = rateLimitMap.get(normalizedEmail);

  // Clean up expired entries periodically
  if (Math.random() < 0.1) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    // First submission or window expired
    rateLimitMap.set(normalizedEmail, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

// Check if email already exists in Airtable
async function checkEmailExists(email: string): Promise<boolean> {
  const airtableApiKey = process.env.AIRTABLE_TOKEN || process.env.AIRTABLE_API_KEY;
  const airtableBaseId = process.env.AIRTABLE_BASE_ID;
  const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Contacts";

  if (!airtableApiKey || !airtableBaseId) {
    return false;
  }

  try {
    const filterFormula = encodeURIComponent(`{Email} = "${email}"`);
    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}?filterByFormula=${filterFormula}&maxRecords=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.records && data.records.length > 0;
  } catch (error) {
    console.error("Failed to check email in Airtable:", error);
    return false;
  }
}

// Function to save contact to Airtable (for newsletter list)
async function saveToAirtable(name: string, email: string, subject?: string) {
  const airtableApiKey = process.env.AIRTABLE_TOKEN || process.env.AIRTABLE_API_KEY;
  const airtableBaseId = process.env.AIRTABLE_BASE_ID;
  const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Contacts";

  if (!airtableApiKey || !airtableBaseId) {
    console.warn("Airtable credentials not configured, skipping save");
    return null;
  }

  try {
    // Check if email already exists
    const exists = await checkEmailExists(email);
    if (exists) {
      console.log("Email already exists in Airtable, skipping save:", email);
      return null;
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: name,
                Email: email,
                Subject: subject || "Not specified",
                "Created At": new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable error:", errorData);
      return null;
    }

    const data = await response.json();
    console.log("Contact saved to Airtable:", data.records[0].id);
    return data;
  } catch (error) {
    console.error("Failed to save to Airtable:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(email);
    if (!allowed) {
      return NextResponse.json(
        { error: "You've reached the daily message limit. Please try again tomorrow." },
        { status: 429 }
      );
    }

    // Save contact to Airtable (non-blocking, don't fail if Airtable fails)
    saveToAirtable(name, email, subject);

    // Create transporter - using Gmail SMTP (you'll need to configure this)
    // For production, use environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "agatevureglory@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject || "New Message"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2ea8ff; border-bottom: 2px solid #2ea8ff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "Not specified"}</p>
          </div>
          <div style="padding: 20px; background: #fff; border: 1px solid #eee; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject || "Not specified"}

Message:
${message}
      `,
    };

    // Send email to Glory
    await transporter.sendMail(mailOptions);

    // Send auto-reply confirmation to the sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for reaching out! - Glory Agatevure",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; padding: 40px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2ea8ff; margin: 0; font-size: 28px;">Glory Agatevure</h1>
            <p style="color: #888; margin: 5px 0 0 0; font-size: 14px;">Protocol Engineer | AI Researcher | Founder</p>
          </div>

          <div style="background: linear-gradient(135deg, rgba(46,168,255,0.1) 0%, rgba(144,122,234,0.1) 100%); padding: 30px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #fff; margin: 0 0 15px 0; font-size: 22px;">
              Hi ${name}! 👋
            </h2>
            <p style="color: #ccc; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
              Thank you so much for reaching out! I've received your message and I really appreciate you taking the time to connect with me.
            </p>
            <p style="color: #ccc; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
              I'll review your message and get back to you as soon as possible, typically within <span style="color: #00f56b; font-weight: 600;">24-48 hours</span>.
            </p>
            <p style="color: #ccc; line-height: 1.8; margin: 0; font-size: 15px;">
              In the meantime, feel free to check out my work and connect with me on social media.
            </p>
          </div>

          <div style="margin-top: 25px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
            <p style="color: #888; font-size: 13px; margin: 0 0 10px 0;">Your message:</p>
            <p style="color: #aaa; font-size: 14px; font-style: italic; margin: 0; line-height: 1.6;">
              "${message.length > 200 ? message.substring(0, 200) + '...' : message}"
            </p>
          </div>

          <div style="margin-top: 30px; text-align: center;">
            <p style="color: #888; font-size: 13px; margin: 0 0 15px 0;">Connect with me:</p>
            <div>
              <a href="https://www.linkedin.com/in/glory-agatevure/" style="color: #2ea8ff; text-decoration: none; margin: 0 10px; font-size: 14px;">LinkedIn</a>
              <a href="https://github.com/gconnect" style="color: #2ea8ff; text-decoration: none; margin: 0 10px; font-size: 14px;">GitHub</a>
              <a href="https://x.com/agatevureglory" style="color: #2ea8ff; text-decoration: none; margin: 0 10px; font-size: 14px;">Twitter</a>
              <a href="https://www.youtube.com/@agatevureglory" style="color: #2ea8ff; text-decoration: none; margin: 0 10px; font-size: 14px;">YouTube</a>
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Best regards,<br>
              <span style="color: #2ea8ff; font-weight: 600;">Glory Agatevure</span>
            </p>
          </div>
        </div>
      `,
      text: `
Hi ${name}!

Thank you so much for reaching out! I've received your message and I really appreciate you taking the time to connect with me.

I'll review your message and get back to you as soon as possible, typically within 24-48 hours.

In the meantime, feel free to check out my work and connect with me on social media:
- LinkedIn: https://www.linkedin.com/in/glory-agatevure/
- GitHub: https://github.com/gconnect
- Twitter: https://x.com/agatevureglory
- YouTube: https://www.youtube.com/@agatevureglory

Best regards,
Glory Agatevure
      `,
    };

    // Send auto-reply to sender
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: "Email sent successfully", remaining },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
