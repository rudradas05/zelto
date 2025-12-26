// import connectDb from "@/lib/db";
// import User from "@/models/userModel";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     await connectDb();
//     const { name, email, password } = await req.json();
//     const existUser = await User.findOne({ email });
//     if (existUser) {
//       return NextResponse.json(
//         { message: "Email already exist" },
//         { status: 400 }
//       );
//     }
//     if (password.length < 6) {
//       return NextResponse.json(
//         { message: "Password must be at least 6 characters" },
//         { status: 400 }
//       );
//     }

//     const hashedPaswword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPaswword,
//     });
//     return NextResponse.json(
//       { message: " user created successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: `Register error ${error}` },
//       { status: 500 }
//     );
//   }
// }

import connectDb from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { name, email, password } = await req.json();

    // 1️⃣ Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // 2️⃣ Normalize email
    const normalizedEmail = email.toLowerCase();

    // 3️⃣ Check existing user
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // 6️⃣ Success response
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
