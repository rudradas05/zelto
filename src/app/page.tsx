import { auth } from "@/auth";
import HomeClient from "@/components/HomeClient";
import Navbar from "@/components/Navbar";
import UserHome from "@/components/user/UserHome";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user?.role) {
    switch (session.user.role) {
      case "admin":
        redirect("/admin");

      case "delivery":
        redirect("/delivery");

      case "user":
      default:
        break;
    }
  }

 
  return (
    <HomeClient isLoggedIn={false}>
      <Navbar />
      <UserHome />
    </HomeClient>
  );
}
