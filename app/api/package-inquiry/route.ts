import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, packageInquiryEmailTemplate } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
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
      message
    } = body;

    if (!name || !email || !phone || !packageName || !travelers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const html = packageInquiryEmailTemplate({
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
    });

    await sendEmail({
      to: process.env.TO_EMAIL || '',
      subject: `🕌 New Booking Inquiry: ${packageName} - ${adults + children} Travelers`,
      html,
    });

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully' });
  } catch (error) {
    console.error('Package inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to send inquiry' },
      { status: 500 }
    );
  }
}
