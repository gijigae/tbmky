import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Initialize Airtable with Personal Access Token
Airtable.configure({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, userName, email, comment } = body;

    // Validate required fields
    if (!companyName || !userName || !email || !comment) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create record in Airtable
    const record = await base('Feedback').create([
      {
        fields: {
          'Company Name': companyName,
          'User Name': userName,
          'Email': email,
          'Comment': comment,
          'Submitted At': formatDate(new Date())
        }
      }
    ]);

    return NextResponse.json({ success: true, record });
  } catch (error) {
    console.error('Error saving feedback:', error);
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    );
  }
}

function formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month}/${day}/${year} ${hours}:${minutes}`;
} 