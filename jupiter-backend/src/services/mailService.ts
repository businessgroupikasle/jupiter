import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST || 'smtp.zoho.in';
const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
const smtpUser = process.env.SMTP_USER || 'marketing@jupitergroups.in';
const smtpPass = process.env.SMTP_PASS || 'd9g9EQyekjej';
const smtpSecure = process.env.SMTP_SECURE === 'false' ? false : true;

export const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export interface EnquiryMailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
  product?: string;
}

// Extract company and product interest if packed in message
export const parseEnquiryDetails = (data: EnquiryMailData) => {
  let company = data.company || '';
  let product = data.product || '';
  let cleanMessage = data.message || '';

  const companyMatch = cleanMessage.match(/Company:\s*([^|\n]+)/i);
  if (companyMatch) company = companyMatch[1].trim();

  const productMatch = cleanMessage.match(/(?:Product Interest|Quotation for|Machinery Requirement):\s*([^|\n]+)/i);
  if (productMatch) product = productMatch[1].trim();

  if (!product) product = cleanMessage.split('|')[0].trim() || 'Machinery Quotation';

  return { company, product, cleanMessage };
};

// 1. Send Alert Email to Jupiter Marketing Team
export const sendEnquiryAlertToMarketing = async (data: EnquiryMailData) => {
  const { company, product, cleanMessage } = parseEnquiryDetails(data);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #001827;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: #001827; padding: 24px; border-bottom: 4px solid #FF9200; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">New Quotation Enquiry Received</h2>
          <p style="color: #FF9200; margin: 6px 0 0; font-size: 13px; font-weight: bold; text-transform: uppercase;">Jupiter Industries Machinery Portal</p>
        </div>
        
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b; width: 35%;">Customer Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #001827;">${data.name}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Company Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #001827;">${company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Phone Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #001827;">
                <a href="tel:${data.phone}" style="color: #FF9200; font-weight: bold; text-decoration: none;">${data.phone}</a>
                <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="margin-left: 10px; background: #25D366; color: #ffffff; padding: 3px 8px; border-radius: 4px; text-decoration: none; font-size: 11px; font-weight: bold;">WhatsApp</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Email Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #001827;">
                <a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Product Interest:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #FF9200; font-weight: bold;">${product}</td>
            </tr>
            <tr>
              <td style="padding: 10px; vertical-align: top; font-weight: bold; color: #64748b;">Message / Requirements:</td>
              <td style="padding: 10px; color: #334155; line-height: 1.5; background: #f8fafc; border-radius: 6px;">${cleanMessage}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <a href="http://localhost:5173/admin?tab=enquiries" style="background: #FF9200; color: #ffffff; padding: 10px 22px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block;">
              Open Admin Dashboard
            </a>
          </div>
        </div>

        <div style="background: #f1f5f9; padding: 14px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Received via Jupiter Industries Official Website • ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
        </div>
      </div>
    </div>
  `;

  return transporter.sendMail({
    from: `"Jupiter Machinery Alert" <marketing@jupitergroups.in>`,
    to: 'marketing@jupitergroups.in',
    replyTo: data.email,
    subject: `🔔 New Quotation Enquiry: ${data.name} - ${product}`,
    html: htmlContent
  });
};

// 2. Send Branded Thank-You Email to the Customer
export const sendThankYouEmailToCustomer = async (data: EnquiryMailData) => {
  if (!data.email || !data.email.includes('@')) return;

  const { product } = parseEnquiryDetails(data);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #001827;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
        <!-- Header with Logo -->
        <div style="background: #001827; padding: 28px 24px; border-bottom: 4px solid #FF9200; text-align: center;">
          <div style="font-size: 26px; font-weight: 900; letter-spacing: 2px; color: #ffffff;">
            JUPITER <span style="color: #FF9200;">INDUSTRIES</span>
          </div>
          <p style="color: #94a3b8; margin: 6px 0 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
            Heavy Duty Machinery & Brick Plant Manufacturers
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 30px 24px;">
          <h3 style="color: #001827; margin-top: 0; font-size: 18px;">Dear ${data.name},</h3>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            Thank you for reaching out to <strong>Jupiter Industries</strong>. We have received your inquiry regarding 
            <span style="color: #FF9200; font-weight: bold;">${product}</span>.
          </p>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            Our technical engineering and commercial sales team is reviewing your requirements and will contact you within <strong>24 hours</strong> with technical specifications, plant layout options, and a tailored quotation.
          </p>

          <div style="background: #F8FAFC; border-left: 4px solid #FF9200; padding: 14px 18px; border-radius: 6px; margin: 24px 0;">
            <div style="font-size: 12px; font-weight: bold; color: #64748B; text-transform: uppercase;">Enquiry Summary</div>
            <div style="font-size: 14px; font-weight: bold; color: #001827; margin-top: 4px;">Product: ${product}</div>
            <div style="font-size: 13px; color: #475569; margin-top: 2px;">Phone: ${data.phone}</div>
          </div>

          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            Need immediate technical support or foundation layout guidance? Feel free to contact our direct sales desk:
          </p>

          <div style="display: flex; gap: 12px; margin-top: 14px;">
            <a href="tel:+919876543210" style="background: #001827; color: #ffffff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold; display: inline-block;">
              📞 Call Sales Desk
            </a>
            <a href="https://wa.me/919876543210?text=Hi%20Jupiter%20Industries,%20I%20have%20submitted%20an%20enquiry%20for%20${encodeURIComponent(product)}" style="background: #25D366; color: #ffffff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold; display: inline-block;">
              💬 Chat on WhatsApp
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 28px 0 20px;" />

          <p style="color: #64748B; font-size: 13px; margin: 0; line-height: 1.5;">
            Warm regards,<br />
            <strong>Sales & Technical Support Team</strong><br />
            Jupiter Industries Machinery Division<br />
            Email: <a href="mailto:marketing@jupitergroups.in" style="color: #FF9200; text-decoration: none;">marketing@jupitergroups.in</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #001827; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8;">
          © 2026 Jupiter Industries. All rights reserved. • SF No. 342, Trichy Road, Coimbatore, Tamil Nadu, India.
        </div>
      </div>
    </div>
  `;

  return transporter.sendMail({
    from: `"Jupiter Industries" <marketing@jupitergroups.in>`,
    to: data.email,
    subject: `Thank you for your enquiry - Jupiter Industries (${product})`,
    html: htmlContent
  });
};
