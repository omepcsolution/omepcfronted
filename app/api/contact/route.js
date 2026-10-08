import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('Email is not configured (missing EMAIL_USER / EMAIL_PASS).');
  }

  // Prefer explicit SMTP config when provided (see env.txt), else fall back to Gmail service.
  // Note: Gmail requires an App Password (Google Account with 2-Step Verification), not the login password.
  if (process.env.EMAIL_HOST) {
    const port = Number(process.env.EMAIL_PORT || '587');
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const phone = String(body?.phone ?? '').trim();
  const subject = String(body?.subject ?? '').trim();
  const message = String(body?.message ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
  }
  if (name.length > 100 || email.length > 254 || message.length > 5000 || subject.length > 200 || phone.length > 30) {
    return NextResponse.json({ error: 'Input is too long.' }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
  }
  if (phone && phone.replace(/\D/g, '').length < 10) {
    return NextResponse.json({ error: 'Valid phone number is required.' }, { status: 400 });
  }

  let transporter;
  try {
    transporter = getTransporter();
  } catch (error) {
    console.error('Failed to send email:', error.message);
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const safeSubject = subject || '(no subject)';
  const recipient = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const mailOptions = {
    from: `"OM EPC Website" <${process.env.EMAIL_USER}>`,
    to: recipient,
    replyTo: `"${name.replaceAll('"', "'")}" <${email}>`,
    subject: `New Lead from OM EPC Website: ${safeSubject}`,
    text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nSubject: ${safeSubject}\n\nMessage:\n${message}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || '-')}</p>
      <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replaceAll('\n', '<br/>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}