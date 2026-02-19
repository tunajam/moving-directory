import { NextRequest, NextResponse } from 'next/server';
import siteConfig from '../../../../site.config';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const quote = {
    timestamp: new Date().toISOString(),
    company: body.company_name,
    company_slug: body.company_slug,
    name: body.name,
    email: body.email,
    phone: body.phone,
    service_option: body.service_option,
    message: body.message,
  };

  console.log('📥 New quote request:', quote);

  // Send notification email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && siteConfig.notifications.provider === 'resend') {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${siteConfig.name} <notifications@${siteConfig.domain}>`,
          to: [siteConfig.notificationEmail],
          subject: `📥 New Quote Request: ${body.company_name} (${body.service_option} ${siteConfig.serviceOptions.unit})`,
          html: `
            <h2>New Quote Request</h2>
            <table style="border-collapse:collapse;font-family:sans-serif;">
              <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Company</td><td>${body.company_name}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Customer</td><td>${body.name}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email</td><td><a href="mailto:${body.email}">${body.email}</a></td></tr>
              <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone</td><td><a href="tel:${body.phone}">${body.phone}</a></td></tr>
              <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">${siteConfig.serviceOptions.label}</td><td>${body.service_option} ${siteConfig.serviceOptions.unit}</td></tr>
              ${body.message ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Message</td><td>${body.message}</td></tr>` : ''}
            </table>
            <p style="margin-top:16px;color:#666;font-size:13px;">
              <a href="https://${siteConfig.domain}/company/${body.company_slug}">View listing</a>
            </p>
          `,
        }),
      });
    } catch (err) {
      console.error('Failed to send notification email:', err);
    }
  }

  return NextResponse.json({ success: true });
}
