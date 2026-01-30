import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, newsletterEmailTemplate } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const html = newsletterEmailTemplate({ email });

    await sendEmail({
      to: process.env.TO_EMAIL || '',
      subject: `New Newsletter Subscription: ${email}`,
      html,
    });

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
