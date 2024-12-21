import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // Replace with your actual secret

export async function POST(request) {
  console.log("first");

  try {
    // Parse the incoming JSON body
    const { email, password } = await request.json();

    // Example credentials validation (you can replace this with actual validation logic)
    if (email === 'admin@example.com' && password === 'password123') {
      const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, {
        expiresIn: '1h',
      });

      // Return a successful response with the token
      return NextResponse.json({ token }, { status: 200 });
    } else {
      // Return 401 for invalid credentials
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
