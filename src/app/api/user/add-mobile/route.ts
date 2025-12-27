// import { auth } from "@/auth";
// import connectDb from "@/lib/db";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     await connectDb();
//     const {  mobile } = await req.json();
//     const session = await auth();
//     const user = await User.findOneAndUpdate(
//       { email: session?.user?.email },
//       {

//         mobile,
//       }
//     );
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 400 });
//     }
//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: `error in edit role and mobile! ${error}` },
//       { status: 500 }
//     );
//   }
// }

import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1️⃣ Auth guard
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Parse & validate input
    const { mobile } = await req.json();

    if (!mobile || typeof mobile !== "string" || mobile.length < 10) {
      return NextResponse.json(
        { message: "Invalid mobile number" },
        { status: 400 }
      );
    }

    // 3️⃣ Connect DB (cached, safe)
    await connectDb();

    // 4️⃣ Update by USER ID (correct)
    const updated = await User.findByIdAndUpdate(
      session.user.id,
      { mobile },
      { new: true }
    ).select("_id mobile");

    if (!updated) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 5️⃣ Success response (minimal)
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Update mobile error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
