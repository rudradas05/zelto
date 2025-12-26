// "use client";

// import { ArrowRight, Zap, Clock, MapPin, Bike } from "lucide-react";
// import { motion } from "motion/react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function WelcomePage() {
//   const router = useRouter();
//   return (
//     <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
//       <div className="pointer-events-none absolute -top-32 h-95 w-95 rounded-full bg-[#16E3A1]/25 blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-35 h-70 w-70 rounded-full bg-[#16E3A1]/10 blur-3xl" />

//       <motion.div
//         initial={{ opacity: 0, y: -28 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="z-10 flex items-center gap-3"
//       >
//         <Bike className="h-11 w-11 text-[#16E3A1]" />
//         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
//           Zelto
//         </h1>
//       </motion.div>

//       <motion.h2
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="z-10 mt-5 max-w-2xl text-2xl md:text-3xl font-semibold text-slate-800"
//       >
//         Groceries at your door in{" "}
//         <span className="text-[#16E3A1]">10 minutes</span>.
//       </motion.h2>

//       <motion.p
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.35 }}
//         className="z-10 mt-4 max-w-xl text-base md:text-lg text-slate-600"
//       >
//         From fresh essentials to daily needs — delivered lightning fast from
//         nearby stores, without hidden charges or delays.
//       </motion.p>

//       <motion.div
//         initial={{ opacity: 0, y: 28 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.55 }}
//         className="z-10 mt-8 flex flex-wrap justify-center gap-3"
//       >
//         <Feature icon={<Clock />} text="10-min delivery" />
//         <Feature icon={<MapPin />} text="Local dark stores" />
//         <Feature icon={<Zap />} text="Live tracking" />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 32 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.75 }}
//         className="z-10 mt-12"
//       >
//         <Button
//           size="lg"
//           className="group rounded-2xl bg-[#16E3A1] px-10 py-6 text-lg font-semibold text-white shadow-xl shadow-[#16E3A1]/30 hover:bg-[#12c98e]"
//           onClick={() => router.push("/sign-up")}
//         >
//           Get Started
//           <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//         </Button>
//       </motion.div>

//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="z-10 mt-6 text-sm text-slate-500"
//       >
//         Trusted by early users • Secure payments • No surge pricing
//       </motion.p>
//     </div>
//   );
// }

// function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
//   return (
//     <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
//       <span className="text-[#16E3A1]">{icon}</span>
//       {text}
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Bike, Clock, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomePage({ onFinish }: { onFinish: () => void }) {
  // ⏱ Auto-skip after 2 seconds
  useEffect(() => {
    const timer = setTimeout(onFinish, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute -top-32 h-95 w-95 rounded-full bg-[#16E3A1]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-35 h-70 w-70 rounded-full bg-[#16E3A1]/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 flex items-center gap-3"
      >
        <Bike className="h-11 w-11 text-[#16E3A1]" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Zelto
        </h1>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="z-10 mt-5 max-w-2xl text-2xl md:text-3xl font-semibold text-slate-800"
      >
        Groceries at your door in{" "}
        <span className="text-[#16E3A1]">10 minutes</span>.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="z-10 mt-4 max-w-xl text-base md:text-lg text-slate-600"
      >
        From fresh essentials to daily needs — delivered lightning fast from
        nearby stores, without hidden charges or delays.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="z-10 mt-8 flex flex-wrap justify-center gap-3"
      >
        <Feature icon={<Clock />} text="10-min delivery" />
        <Feature icon={<MapPin />} text="Local dark stores" />
        <Feature icon={<Zap />} text="Live tracking" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="z-10 mt-12"
      >
        <Button
          size="lg"
          className="group rounded-2xl bg-[#16E3A1] px-10 py-6 text-lg font-semibold text-white shadow-xl shadow-[#16E3A1]/30 hover:bg-[#12c98e]"
          onClick={onFinish}
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="z-10 mt-6 text-sm text-slate-500"
      >
        Trusted by early users • Secure payments • No surge pricing
      </motion.p>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
      <span className="text-[#16E3A1]">{icon}</span>
      {text}
    </div>
  );
}
