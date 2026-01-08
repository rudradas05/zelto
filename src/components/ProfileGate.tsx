"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const EditMobile = dynamic(() => import("@/components/EditMobile"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
      Loading profile setup…
    </div>
  ),
});

export default function ProfileGate({
  isIncomplete,
  children,
}: {
  isIncomplete: boolean;
  children: React.ReactNode;
}) {
 
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  if (isIncomplete) {
    return <EditMobile />;
  }

  return <>{children}</>;
}
