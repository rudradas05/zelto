import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/userModel";
import { redirect } from "next/navigation";

import ProfileGate from "@/components/ProfileGate";
import HomeClient from "@/components/HomeClient";
import UserHome from "@/components/user/UserHome";

export default async function UserHomePage() {
  await connectDb();
  const session = await auth();

  // 🔒 User-only route protection
  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await User.findById(session.user.id).lean();

  // 🚨 Invalid session edge-case
  if (!user) {
    redirect("/");
  }

  const isIncomplete = !user.mobile;

  return (
    <ProfileGate isIncomplete={isIncomplete}>
      <HomeClient isLoggedIn>
        <UserHome />
      </HomeClient>
    </ProfileGate>
  );
}
