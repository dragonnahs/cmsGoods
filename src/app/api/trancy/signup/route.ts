import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password, referrer } = await request.json();

  try {
    const response = await fetch('https://api.trancy.org/1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `referrer=${referrer}`,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Signup API Error:', error);
    return NextResponse.json(
      { error: 'Failed to register account' },
      { status: 500 }
    );
  }
} 