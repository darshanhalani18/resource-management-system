import nodemailer from "nodemailer";

export async function sendInviteEmail(to: string, name: string, tempPass: string, orgCode: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com", 
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Action Required: Complete your Account Setup",
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #137fec; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to the Team</h1>
        </div>
        <div style="padding: 40px; color: #1e293b; line-height: 1.6;">
          <p>Hello <strong>${name}</strong>,</p>
          <p>An account has been created for you in the Resource Management System. Please use the following credentials for your first login:</p>
          
          <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Organization Code:</strong> <code style="color: #137fec;">${orgCode}</code></p>
            <p style="margin: 0;"><strong>Temporary Password:</strong> <code style="color: #137fec;">${tempPass}</code></p>
          </div>

          <p style="font-size: 14px; color: #64748b;"><em>Note: You will be required to change this password immediately upon logging in for security purposes.</em></p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" 
             style="display: inline-block; background-color: #137fec; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">
             Login to Dashboard
          </a>
        </div>
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
          &copy; 2026 Resource Management System. This is an automated message, please do not reply.
        </div>
      </div>
    `,
  });
}