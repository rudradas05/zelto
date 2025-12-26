"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import WelcomePage from "@/components/Welcome";



// 🔁 Replace with your real auth hook
const useAuth = () => {
  return { isLoggedIn: false }; 
};

export default function Home() {
  const { isLoggedIn } = useAuth();

  const [showWelcome, setShowWelcome] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("zelto_welcome_seen");

    
    if (hasSeen || isLoggedIn) {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }

    setReady(true);
  }, [isLoggedIn]);

  const finishWelcome = () => {
    sessionStorage.setItem("zelto_welcome_seen", "true");

    // 📊 Analytics
    window.dispatchEvent(
      new CustomEvent("zelto:welcome_completed", {
        detail: { timestamp: Date.now() },
      })
    );

    setShowWelcome(false);
  };

  if (!ready) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomePage key="welcome" onFinish={finishWelcome} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          {/* <Navbar />
          <HeroSection />
          <TopProducts />
          <UserExperience />
          <Footer /> */}
        </>
      )}
    </>
  );
}
