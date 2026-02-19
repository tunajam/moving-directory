import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const data = await request.json();
  const entry = { ...data, submitted_at: new Date().toISOString() };

  // Log to console in production
  console.log('[LEAD CAPTURE]', JSON.stringify(entry));

  // In development, also append to a local JSON file
  if (process.env.NODE_ENV === 'development') {
    try {
      const filePath = path.join(process.cwd(), 'data', 'lead-submissions.json');
      const existing = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        : [];
      existing.push(entry);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    } catch (err) {
      console.error('Failed to write lead submission:', err);
    }
  }

  return NextResponse.json({ success: true });
}
