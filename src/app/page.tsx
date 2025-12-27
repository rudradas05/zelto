// import { auth } from "@/auth";

// import User from "@/models/userModel";
// import ProfileGate from "@/components/ProfileGate";
// import HomeClient from "@/components/HomeClient";

// export default async function Home() {
//   const session = await auth();

//   if (!session?.user?.id) {
//     return <HomeClient isLoggedIn={false} />;
//   }

//   const user = await User.findById(session.user.id).lean();

//   const isIncomplete = !user?.mobile || !user?.role;

//   return (
//     <ProfileGate isIncomplete={isIncomplete}>
//       <HomeClient isLoggedIn={true} />
//     </ProfileGate>
//   );
// }

import { auth } from "@/auth";
import User from "@/models/userModel";
import ProfileGate from "@/components/ProfileGate";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const session = await auth();

  // 🔓 Not logged in
  if (!session?.user?.id) {
    return <HomeClient isLoggedIn={false} />;
  }

  const user = await User.findById(session.user.id).lean();

  // 🚨 Edge case: session exists but user missing
  if (!user) {
    return <HomeClient isLoggedIn={false} />;
  }

  // ✅ Profile completion = mobile only
  const isIncomplete = !user.mobile;

  return (
    <ProfileGate isIncomplete={isIncomplete}>
      <HomeClient isLoggedIn />
    </ProfileGate>
  );
}
