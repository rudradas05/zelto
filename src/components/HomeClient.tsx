"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import WelcomePage from "@/components/Welcome";

interface Props {
  isLoggedIn: boolean;
}

export default function HomeClient({ isLoggedIn }: Props) {
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
    setShowWelcome(false);
  };

  if (!ready) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && <WelcomePage key="welcome" onFinish={finishWelcome} />}
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
