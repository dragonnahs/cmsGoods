import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    const result = await sql`
      SELECT id, email_url as email, created_at
      FROM emails
      WHERE email_url = ${email} AND type = 1
      LIMIT 1
    `;

    if (result.rows.length > 0) {
      return NextResponse.json({ email: result.rows[0] });
    } else {
      return NextResponse.json({ email: null });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to query email' },
      { status: 500 }
    );
  }
} 