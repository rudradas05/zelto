// "use client";

// import EditRoleMobile from "@/components/EditRoleMobile";

// export default function ProfileGate({
//   isIncomplete,
//   children,
// }: {
//   isIncomplete: boolean;
//   children: React.ReactNode;
// }) {
//   if (isIncomplete) {
//     return <EditRoleMobile />;
//   }

//   return <>{children}</>;
// }

"use client";

import dynamic from "next/dynamic";

const EditMobile = dynamic(() => import("@/components/EditMobile"), {
  ssr: false,
});

export default function ProfileGate({
  isIncomplete,
  children,
}: {
  isIncomplete: boolean;
  children: React.ReactNode;
}) {
  if (isIncomplete) {
    return <EditMobile />;
  }

  return <>{children}</>;
}
