"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomePage from "@/components/Welcome";

interface Props {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export default function HomeClient({ isLoggedIn, children }: Props) {
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("zelto_welcome_seen");

    if (hasSeen || isLoggedIn) {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
  }, [isLoggedIn]);

  const finishWelcome = () => {
    sessionStorage.setItem("zelto_welcome_seen", "true");
    setShowWelcome(false);
  };

  // Controlled initial state (no blank screen)
  if (showWelcome === null) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {showWelcome && <WelcomePage key="welcome" onFinish={finishWelcome} />}
      </AnimatePresence>

      {!showWelcome && children}
    </>
  );
}
