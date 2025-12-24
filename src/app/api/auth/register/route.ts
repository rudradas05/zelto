import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
  } catch (error) {}
}
