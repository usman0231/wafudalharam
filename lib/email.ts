import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const mailOptions = {
    from: `"Wafud Al Haram" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
}

export function contactEmailTemplate({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const subjectLabels: { [key: string]: string } = {
    'umrah': 'Umrah Package Inquiry',
    'hajj': 'Hajj Package Inquiry',
    'booking': 'Booking Assistance',
    'general': 'General Question',
    'feedback': 'Feedback'
  };

  const subjectDisplay = subjectLabels[subject] || subject;
  const firstLetter = name.trim().charAt(0).toUpperCase();
  const firstName = name.split(' ')[0];

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f0ebe3;">
      <div style="padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #b8956a 0%, #0d6e6e 100%); padding: 50px 40px; text-align: center;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; border: 2px solid rgba(255,255,255,0.3); line-height: 76px;">
              <img src="https://img.icons8.com/fluency/96/new-post.png" alt="email" style="width: 40px; height: 40px; vertical-align: middle;" />
            </div>
            <h1 style="color: #ffffff; margin: 0 0 10px; font-size: 28px; font-weight: 700;">New Message Received</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">Someone reached out through your contact form</p>
            <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 10px 24px; border-radius: 50px; color: white; font-size: 13px; font-weight: 600; margin-top: 15px; border: 1px solid rgba(255,255,255,0.3);">
              ${subjectDisplay}
            </div>
          </div>

          <!-- Content -->
          <div style="padding: 40px;">

            <!-- Sender Card -->
            <div style="background: linear-gradient(135deg, #faf6f1 0%, #f5f0ea 100%); border-radius: 20px; padding: 25px; margin-bottom: 25px; border: 1px solid #e8dfd3;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td width="75" valign="top">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #b8956a 0%, #0d6e6e 100%); border-radius: 50%; text-align: center; line-height: 60px; font-size: 26px; font-weight: 700; color: white; text-transform: uppercase;">
                      ${firstLetter}
                    </div>
                  </td>
                  <td valign="middle">
                    <h3 style="margin: 0 0 5px; color: #1a1a2e; font-size: 20px; font-weight: 700;">${name}</h3>
                    <p style="margin: 0; color: #b8956a; font-size: 14px; font-weight: 500;">Potential Customer</p>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 20px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td width="50%" style="padding-right: 8px;">
                      <div style="background: white; border-radius: 12px; padding: 15px; border: 1px solid #eee;">
                        <div style="font-size: 11px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; font-weight: 700;">📧 Email</div>
                        <div style="font-size: 14px; color: #1a1a2e; font-weight: 600; word-break: break-all;">
                          <a href="mailto:${email}" style="color: #1a1a2e; text-decoration: none;">${email}</a>
                        </div>
                      </div>
                    </td>
                    <td width="50%" style="padding-left: 8px;">
                      <div style="background: white; border-radius: 12px; padding: 15px; border: 1px solid #eee;">
                        <div style="font-size: 11px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; font-weight: 700;">📱 Phone</div>
                        <div style="font-size: 14px; color: #1a1a2e; font-weight: 600;">
                          ${phone ? `<a href="tel:${phone}" style="color: #1a1a2e; text-decoration: none;">${phone}</a>` : '<span style="color: #999;">Not provided</span>'}
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Message Section -->
            <div style="margin-top: 25px;">
              <div style="font-size: 12px; color: #b8956a; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; font-weight: 700;">
                💬 Their Message
              </div>
              <div style="background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); border-radius: 16px; padding: 25px 25px 25px 30px; border-left: 4px solid #b8956a;">
                <p style="color: #333; font-size: 16px; line-height: 1.8; margin: 0; font-style: italic;">"${message}"</p>
              </div>
            </div>

            <!-- Divider -->
            <div style="height: 1px; background: linear-gradient(90deg, transparent, #e0d5c7, transparent); margin: 35px 0;"></div>

            <!-- Meta Information -->
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f0f1f2 100%); border-radius: 16px; padding: 5px; border: 1px solid #e5e7eb;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e5e7eb;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">📅 Received</td>
                        <td align="right" style="color: #1a1a2e; font-size: 13px; font-weight: 600;">${currentDate} at ${currentTime}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e5e7eb;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">📂 Category</td>
                        <td align="right" style="color: #0d6e6e; font-size: 13px; font-weight: 600;">${subjectDisplay}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e5e7eb;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">⚡ Priority</td>
                        <td align="right">
                          <span style="display: inline-block; padding: 5px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; background: linear-gradient(135deg, #b8956a20 0%, #0d6e6e20 100%); color: #b8956a; border: 1px solid #b8956a30;">Normal</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">🌐 Source</td>
                        <td align="right" style="color: #1a1a2e; font-size: 13px; font-weight: 600;">Website Contact Form</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin-top: 30px;">
              <table cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td style="padding-right: 10px;">
                    <a href="mailto:${email}?subject=Re: ${subjectDisplay}" style="display: inline-block; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px; background: linear-gradient(135deg, #b8956a 0%, #0d6e6e 100%); color: white; box-shadow: 0 4px 15px rgba(184, 149, 106, 0.4);">
                      ✉️ Reply to ${firstName}
                    </a>
                  </td>
                  ${phone ? `
                  <td style="padding-left: 10px;">
                    <a href="tel:${phone}" style="display: inline-block; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px; background: #ffffff; color: #1a1a2e; border: 2px solid #e5e7eb; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                      📞 Call Now
                    </a>
                  </td>
                  ` : ''}
                </tr>
              </table>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; text-align: center;">
            <div style="font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Wafud Al Haram</div>
            <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 25px;">Your Trusted Hajj & Umrah Partner Since 2014</p>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 10px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">This message was sent from the contact form on your website.</p>
            </div>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}

export function newsletterEmailTemplate({ email }: { email: string }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f0ebe3;">
      <div style="padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #b8956a 0%, #0d6e6e 100%); padding: 50px 40px; text-align: center;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; border: 2px solid rgba(255,255,255,0.3); text-align: center; line-height: 80px;">
              <span style="font-size: 36px; vertical-align: middle;">🔔</span>
            </div>
            <h1 style="color: #ffffff; margin: 0 0 10px; font-size: 28px; font-weight: 700;">New Subscriber Alert!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">Someone just joined your newsletter family</p>
            <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 10px 24px; border-radius: 50px; color: white; font-size: 13px; font-weight: 600; margin-top: 15px; border: 1px solid rgba(255,255,255,0.3);">
              Newsletter Subscription
            </div>
          </div>

          <!-- Content -->
          <div style="padding: 40px;">

            <!-- Subscriber Card -->
            <div style="background: linear-gradient(135deg, #faf6f1 0%, #f5f0ea 100%); border-radius: 20px; padding: 30px; margin-bottom: 25px; border: 1px solid #e8dfd3; text-align: center;">
              <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #b8956a 0%, #0d6e6e 100%); border-radius: 50%; margin: 0 auto 20px; text-align: center; line-height: 70px;">
                <span style="font-size: 28px; color: white;">📧</span>
              </div>
              <div style="font-size: 11px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; font-weight: 700;">
                New Subscriber Email
              </div>
              <div style="background: white; border-radius: 12px; padding: 18px 25px; border: 2px solid #b8956a; display: inline-block;">
                <a href="mailto:${email}" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 18px; color: #1a1a2e; font-weight: 700; text-decoration: none; letter-spacing: 0.5px;">
                  ${email}
                </a>
              </div>
            </div>

            <!-- Info Section -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="50%" style="padding-right: 8px; padding-bottom: 16px;">
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f0f1f2 100%); border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; height: 100%;">
                    <div style="font-size: 11px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                      📅 Subscription Date
                    </div>
                    <div style="font-size: 14px; color: #1a1a2e; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                      ${currentDate}
                    </div>
                  </div>
                </td>
                <td width="50%" style="padding-left: 8px; padding-bottom: 16px;">
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f0f1f2 100%); border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; height: 100%;">
                    <div style="font-size: 11px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                      🕐 Time
                    </div>
                    <div style="font-size: 14px; color: #1a1a2e; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                      ${currentTime}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding-right: 8px;">
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f0f1f2 100%); border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; height: 100%;">
                    <div style="font-size: 11px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                      🌐 Source
                    </div>
                    <div style="font-size: 14px; color: #1a1a2e; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                      Website Footer
                    </div>
                  </div>
                </td>
                <td width="50%" style="padding-left: 8px;">
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f0f1f2 100%); border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; height: 100%;">
                    <div style="font-size: 11px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                      ✅ Status
                    </div>
                    <div>
                      <span style="display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; background: linear-gradient(135deg, #0d6e6e20 0%, #0d6e6e30 100%); color: #0d6e6e; border: 1px solid #0d6e6e40; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Active</span>
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <div style="height: 1px; background: linear-gradient(90deg, transparent, #e0d5c7, transparent); margin: 35px 0;"></div>

            <!-- Tip Section -->
            <div style="text-align: center; padding: 15px 20px; background: linear-gradient(135deg, #faf6f1 0%, #f5f0ea 100%); border-radius: 12px; border-left: 4px solid #b8956a;">
              <p style="color: #1a1a2e; font-size: 15px; margin: 0 0 5px; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">🎉 Your newsletter is growing!</p>
              <p style="color: #666; font-size: 13px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Remember to send valuable content to keep subscribers engaged.</p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="display: inline-block; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px; background: linear-gradient(135deg, #b8956a 0%, #0d6e6e 100%); color: #ffffff; box-shadow: 0 4px 15px rgba(184, 149, 106, 0.4); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                ✉️ Reply to Subscriber
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; text-align: center;">
            <div style="font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Wafud Al Haram</div>
            <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 25px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Your Trusted Hajj & Umrah Partner Since 2014</p>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 10px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">This is an automated notification from your website's newsletter system.</p>
            </div>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}

interface Traveler {
  name: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
}

export function packageInquiryEmailTemplate({
  name,
  email,
  phone,
  adults,
  children,
  packageName,
  packagePrice,
  packageDays,
  travelers,
  departureDate,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  packageName: string;
  packagePrice: string;
  packageDays: string;
  travelers: Traveler[];
  departureDate: string;
  message: string;
}) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const totalTravelers = adults + children;
  const firstLetter = name.trim().charAt(0).toUpperCase();

  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    if (!dob) return '-';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const travelersHtml = travelers.map((t, index) => `
    <div style="background: ${index % 2 === 0 ? '#ffffff' : '#fafafa'}; border-radius: 16px; margin-bottom: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
      <!-- Traveler Header -->
      <div style="background: linear-gradient(135deg, ${index < adults ? '#b8956a' : '#0d6e6e'} 0%, ${index < adults ? '#a07d5a' : '#0a5555'} 100%); padding: 15px 20px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td>
              <span style="display: inline-block; width: 32px; height: 32px; background: rgba(255,255,255,0.25); border-radius: 50%; text-align: center; line-height: 32px; font-size: 14px; font-weight: 700; color: white; margin-right: 12px;">${index + 1}</span>
              <span style="font-size: 16px; font-weight: 700; color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${t.name || 'Not provided'}</span>
            </td>
            <td align="right">
              <span style="display: inline-block; padding: 5px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; background: rgba(255,255,255,0.95); color: ${index < adults ? '#b8956a' : '#0d6e6e'}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                ${index < adults ? '👤 Adult' : '👶 Child'}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Traveler Details Grid -->
      <div style="padding: 20px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="50%" style="padding-right: 10px; padding-bottom: 15px;">
              <div style="background: #f8f9fa; border-radius: 10px; padding: 12px 15px;">
                <div style="font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; font-weight: 600;">🎂 Date of Birth</div>
                <div style="font-size: 14px; color: #1a1a2e; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${formatDate(t.dateOfBirth)}</div>
                <div style="font-size: 11px; color: #0d6e6e; margin-top: 2px;">(Age: ${calculateAge(t.dateOfBirth)} years)</div>
              </div>
            </td>
            <td width="50%" style="padding-left: 10px; padding-bottom: 15px;">
              <div style="background: #f8f9fa; border-radius: 10px; padding: 12px 15px;">
                <div style="font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; font-weight: 600;">${t.gender === 'male' ? '👨' : '👩'} Gender</div>
                <div style="font-size: 14px; color: #1a1a2e; font-weight: 600; text-transform: capitalize; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${t.gender || '-'}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding-right: 10px; padding-bottom: 15px;">
              <div style="background: #f8f9fa; border-radius: 10px; padding: 12px 15px;">
                <div style="font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; font-weight: 600;">🌍 Nationality</div>
                <div style="font-size: 14px; color: #1a1a2e; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${t.nationality || '-'}</div>
              </div>
            </td>
            <td width="50%" style="padding-left: 10px; padding-bottom: 15px;">
              <div style="background: #f8f9fa; border-radius: 10px; padding: 12px 15px;">
                <div style="font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; font-weight: 600;">📘 Passport No.</div>
                <div style="font-size: 14px; color: #1a1a2e; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; letter-spacing: 1px;">${t.passportNumber || '-'}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; padding: 12px 15px; border: 1px solid #f59e0b30;">
                <div style="font-size: 10px; color: #92400e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; font-weight: 600;">⚠️ Passport Expiry</div>
                <div style="font-size: 14px; color: #92400e; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${formatDate(t.passportExpiry)}</div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f0ebe3;">
      <div style="padding: 40px 20px;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">

          <!-- Header with Kaaba Pattern -->
          <div style="background: linear-gradient(135deg, #b8956a 0%, #0d6e6e 100%); padding: 50px 40px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.05)%22 stroke-width=%221%22/></svg>') repeat; opacity: 0.5;"></div>

            <!-- Animated Star Icon -->
            <div style="width: 90px; height: 90px; background: rgba(255,255,255,0.15); border-radius: 50%; margin: 0 auto 20px; border: 3px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; position: relative;">
              <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.2); border-radius: 50%; text-align: center; line-height: 70px;">
                <span style="font-size: 40px;">🕋</span>
              </div>
            </div>

            <h1 style="color: #ffffff; margin: 0 0 8px; font-size: 32px; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">New Booking Inquiry!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 5px; font-size: 16px;">A blessed journey awaits confirmation</p>
            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 13px;">${currentDate} • ${currentTime}</p>

            <!-- Package Badge -->
            <div style="margin-top: 25px;">
              <div style="display: inline-block; background: rgba(255,255,255,0.98); padding: 20px 35px; border-radius: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);">
                <div style="font-size: 11px; color: #b8956a; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin-bottom: 8px;">Selected Package</div>
                <div style="font-size: 22px; font-weight: 800; color: #1a1a2e; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${packageName}</div>
                <div style="margin-top: 10px; display: flex; justify-content: center; gap: 15px;">
                  <span style="display: inline-block; padding: 6px 14px; background: #b8956a15; border-radius: 8px; font-size: 13px; color: #b8956a; font-weight: 600;">${packageDays}</span>
                  <span style="display: inline-block; padding: 6px 14px; background: #0d6e6e15; border-radius: 8px; font-size: 13px; color: #0d6e6e; font-weight: 700;">${packagePrice}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Stats Bar -->
          <div style="background: linear-gradient(90deg, #1a1a2e 0%, #16213e 100%); padding: 0;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="33.33%" style="text-align: center; padding: 20px; border-right: 1px solid rgba(255,255,255,0.1);">
                  <div style="font-size: 28px; font-weight: 800; color: #ffffff;">${totalTravelers}</div>
                  <div style="font-size: 10px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1px; margin-top: 3px;">Total Travelers</div>
                </td>
                <td width="33.33%" style="text-align: center; padding: 20px; border-right: 1px solid rgba(255,255,255,0.1);">
                  <div style="font-size: 28px; font-weight: 800; color: #b8956a;">${adults}</div>
                  <div style="font-size: 10px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1px; margin-top: 3px;">Adults (12+)</div>
                </td>
                <td width="33.33%" style="text-align: center; padding: 20px;">
                  <div style="font-size: 28px; font-weight: 800; color: #0d6e6e;">${children}</div>
                  <div style="font-size: 10px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1px; margin-top: 3px;">Children (2-11)</div>
                </td>
              </tr>
            </table>
          </div>

          <!-- Content -->
          <div style="padding: 40px;">

            <!-- Contact Person Card -->
            <div style="background: linear-gradient(135deg, #faf6f1 0%, #f5f0ea 100%); border-radius: 20px; padding: 25px; margin-bottom: 30px; border: 1px solid #e8dfd3;">
              <div style="font-size: 11px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 18px; font-weight: 700;">
                📋 Primary Contact Information
              </div>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td width="80" valign="top">
                    <div style="width: 65px; height: 65px; background: linear-gradient(135deg, #b8956a 0%, #0d6e6e 100%); border-radius: 50%; text-align: center; line-height: 65px; font-size: 28px; font-weight: 700; color: white; text-transform: uppercase; box-shadow: 0 4px 15px rgba(184, 149, 106, 0.3);">
                      ${firstLetter}
                    </div>
                  </td>
                  <td valign="middle" style="padding-left: 5px;">
                    <h3 style="margin: 0 0 5px; color: #1a1a2e; font-size: 22px; font-weight: 700;">${name}</h3>
                    <p style="margin: 0; color: #b8956a; font-size: 13px; font-weight: 600;">Booking Coordinator</p>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 20px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td width="50%" style="padding-right: 8px;">
                      <div style="background: white; border-radius: 14px; padding: 18px; border: 1px solid #eee; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                        <div style="font-size: 10px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 700;">📧 Email Address</div>
                        <div style="font-size: 14px; color: #1a1a2e; font-weight: 600; word-break: break-all;">
                          <a href="mailto:${email}" style="color: #1a1a2e; text-decoration: none;">${email}</a>
                        </div>
                      </div>
                    </td>
                    <td width="50%" style="padding-left: 8px;">
                      <div style="background: white; border-radius: 14px; padding: 18px; border: 1px solid #eee; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                        <div style="font-size: 10px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 700;">📱 Phone Number</div>
                        <div style="font-size: 14px; color: #1a1a2e; font-weight: 600;">
                          <a href="tel:${phone}" style="color: #1a1a2e; text-decoration: none;">${phone}</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Preferred Departure & Inquiry Info -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
              <tr>
                <td width="50%" style="padding-right: 10px;">
                  <div style="background: linear-gradient(135deg, #0d6e6e 0%, #0a5555 100%); border-radius: 16px; padding: 22px; text-align: center; color: white;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.8; margin-bottom: 8px; font-weight: 600;">📅 Preferred Departure</div>
                    <div style="font-size: 20px; font-weight: 700;">${departureDate || 'Flexible'}</div>
                  </div>
                </td>
                <td width="50%" style="padding-left: 10px;">
                  <div style="background: linear-gradient(135deg, #b8956a 0%, #a07d5a 100%); border-radius: 16px; padding: 22px; text-align: center; color: white;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.8; margin-bottom: 8px; font-weight: 600;">⏰ Inquiry Received</div>
                    <div style="font-size: 20px; font-weight: 700;">${currentTime}</div>
                  </div>
                </td>
              </tr>
            </table>

            <!-- Travelers Section Header -->
            <div style="background: linear-gradient(90deg, #1a1a2e 0%, #16213e 100%); border-radius: 14px; padding: 18px 25px; margin-bottom: 20px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td>
                    <span style="font-size: 13px; color: white; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">👥 Complete Traveler Details</span>
                  </td>
                  <td align="right">
                    <span style="font-size: 12px; color: rgba(255,255,255,0.7);">${totalTravelers} ${totalTravelers === 1 ? 'Person' : 'People'}</span>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Travelers List -->
            <div style="margin-bottom: 30px;">
              ${travelersHtml}
            </div>

            ${message ? `
            <!-- Message Section -->
            <div style="margin-bottom: 30px;">
              <div style="font-size: 11px; color: #0d6e6e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; font-weight: 700;">
                💬 Additional Message from Customer
              </div>
              <div style="background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); border-radius: 16px; padding: 25px; border-left: 5px solid #b8956a; position: relative;">
                <div style="position: absolute; top: 15px; left: 20px; font-size: 40px; color: #b8956a; opacity: 0.2; font-family: Georgia, serif;">"</div>
                <p style="color: #333; font-size: 16px; line-height: 1.8; margin: 0; font-style: italic; padding-left: 25px;">${message}</p>
              </div>
            </div>
            ` : ''}

            <!-- Action Buttons -->
            <div style="text-align: center; margin-top: 35px;">
              <table cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td style="padding-right: 8px;">
                    <a href="mailto:${email}?subject=Re: ${packageName} Booking Inquiry - Wafud Al Haram" style="display: inline-block; padding: 18px 30px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px; background: linear-gradient(135deg, #b8956a 0%, #0d6e6e 100%); color: #ffffff; box-shadow: 0 6px 20px rgba(184, 149, 106, 0.4);">
                      ✉️ Reply via Email
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(name)},%20Thank%20you%20for%20your%20${encodeURIComponent(packageName)}%20booking%20inquiry." style="display: inline-block; padding: 18px 30px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: #ffffff; box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);">
                      💬 WhatsApp
                    </a>
                  </td>
                  <td style="padding-left: 8px;">
                    <a href="tel:${phone}" style="display: inline-block; padding: 18px 30px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px; background: #ffffff; color: #1a1a2e; border: 2px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                      📞 Call Now
                    </a>
                  </td>
                </tr>
              </table>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 45px 40px; text-align: center;">
            <div style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 5px;">Wafud Al Haram</div>
            <p style="color: #b8956a; font-size: 14px; margin: 0 0 8px; font-weight: 600;">وفود الحرم</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 25px;">Your Trusted Hajj & Umrah Partner Since 2014</p>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 25px; margin-top: 10px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0 0 8px;">This inquiry was submitted from the package booking form on wafudalharam.com</p>
              <p style="color: rgba(255,255,255,0.3); font-size: 10px; margin: 0;">Please respond within 24 hours to maintain excellent customer service.</p>
            </div>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}
