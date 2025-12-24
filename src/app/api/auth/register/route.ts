import connectDb from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { name, email, password } = await req.json();
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const hashedPaswword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPaswword,
    });
    return NextResponse.json(
      { message: " user created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Register error ${error}` },
      { status: 500 }
    );
  }
}
