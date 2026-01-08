// "use client";

// import { Leaf, Truck, Smartphone } from "lucide-react";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// function HeroSection() {
//   const slides = [
//     {
//       id: 1,
//       icon: (
//         <Leaf className="w-16 h-16 sm:w-24 sm:h-24 text-green-400 drop-shadow-lg" />
//       ),
//       title: "Fresh Organic Groceries 🌱",
//       subtitle:
//         "Farm-fresh fruits, vegetables, and daily essentials delivered to your doorstep.",
//       btnText: "Shop Now",
//       bg: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=1740&auto=format&fit=crop",
//     },
//     {
//       id: 2,
//       icon: (
//         <Truck className="w-16 h-16 sm:w-24 sm:h-24 text-yellow-400 drop-shadow-lg" />
//       ),
//       title: "Fast & Reliable Delivery 🚚",
//       subtitle:
//         "We ensure your groceries reach your home quickly, safely, and on time.",
//       btnText: "Order Now",
//       bg: "https://images.unsplash.com/photo-1593114360701-ba572aa30aaa?q=80&w=1740&auto=format&fit=crop",
//     },
//     {
//       id: 3,
//       icon: (
//         <Smartphone className="w-16 h-16 sm:w-24 sm:h-24 text-blue-400 drop-shadow-lg" />
//       ),
//       title: "Shop Anytime, Anywhere 📱",
//       subtitle:
//         "A seamless online grocery shopping experience across all your devices.",
//       btnText: "Get the App",
//       bg: "https://plus.unsplash.com/premium_photo-1741657668231-1b31f66b5368?q=80&w=1740&auto=format&fit=crop",
//     },
//   ];

//   const [curr, setCurr] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurr((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const slide = slides[curr];

//   return (
//     <section className="relative h-[90vh] w-full overflow-hidden">
//       {/* Background */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={slide.id}
//           initial={{ opacity: 0, scale: 1.05 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 1.05 }}
//           transition={{ duration: 0.8 }}
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url(${slide.bg})` }}
//         />
//       </AnimatePresence>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

//       {/* Content */}
//       <div className="relative z-10 flex h-full items-center justify-center px-6">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={slide.id + "-content"}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -40 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-3xl text-center text-white"
//           >
//             <div className="mb-6 flex justify-center">{slide.icon}</div>

//             <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
//               {slide.title}
//             </h1>

//             <p className="text-lg sm:text-xl text-gray-200 mb-8">
//               {slide.subtitle}
//             </p>

//             <button className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-black hover:bg-gray-200 transition">
//               {slide.btnText}
//             </button>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurr(i)}
//             className={`h-2 w-2 rounded-full transition ${
//               i === curr ? "bg-white w-6" : "bg-white/50"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// export default HeroSection;

"use client";

import Image from "next/image";
import { Leaf, Truck, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shimmer, toBase64 } from "@/lib/shimmer";
import { getImageQuality } from "@/lib/network";

const slides = [
  {
    id: 1,
    icon: <Leaf className="w-16 h-16 sm:w-24 sm:h-24 text-green-400" />,
    title: "Fresh Organic Groceries 🌱",
    subtitle: "Farm-fresh essentials delivered instantly.",
    btnText: "Shop Now",
    bg: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7",
  },
  {
    id: 2,
    icon: <Truck className="w-16 h-16 sm:w-24 sm:h-24 text-yellow-400" />,
    title: "Fast & Reliable Delivery 🚚",
    subtitle: "On-time, every time.",
    btnText: "Order Now",
    bg: "https://images.unsplash.com/photo-1593114360701-ba572aa30aaa",
  },
  {
    id: 3,
    icon: <Smartphone className="w-16 h-16 sm:w-24 sm:h-24 text-blue-400" />,
    title: "Shop Anytime 📱",
    subtitle: "Seamless experience across devices.",
    btnText: "Get the App",
    bg: "https://plus.unsplash.com/premium_photo-1741657668231-1b31f66b5368",
  },
];

export default function HeroSection() {
  const [curr, setCurr] = useState(0);
  const [quality, setQuality] = useState(80);
  const [paused, setPaused] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  /* Hydration-safe image quality */
  useEffect(() => {
    setQuality(getImageQuality());
  }, []);

  /* Auto slide (strict-mode safe) */
  useEffect(() => {
    if (paused) return;

    let id: NodeJS.Timeout;

    id = setInterval(() => {
      setCurr((p) => (p + 1) % slides.length);
      setImageLoaded(false);
    }, 4500);

    return () => clearInterval(id);
  }, [paused]);

  /* Preload next image */
  useEffect(() => {
    const next = (curr + 1) % slides.length;
    const img = new window.Image();
    img.src = `${slides[next].bg}?w=1200&q=${quality}&auto=format`;
  }, [curr, quality]);

  const slide = slides[curr];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[80vh] w-[98%] mx-auto mt-3 overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      {/* Skeleton fallback */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse z-0" />
      )}

      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={`${slide.bg}?w=1200&q=${quality}&auto=format`}
            alt={slide.title}
            fill
            priority={curr === 0}
            fetchPriority={curr === 0 ? "high" : "auto"}
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(1200, 700)
            )}`}
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Content */}
      <div className="relative z-20 flex h-full items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-content"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) {
                setCurr((p) => (p + 1) % slides.length);
                setImageLoaded(false);
              } else if (info.offset.x > 80) {
                setCurr((p) => (p - 1 + slides.length) % slides.length);
                setImageLoaded(false);
              }
            }}
            className="text-center text-white max-w-3xl cursor-grab active:cursor-grabbing"
          >
            <div className="mb-6 flex justify-center">{slide.icon}</div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {slide.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 mb-8">
              {slide.subtitle}
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-black hover:bg-gray-200 transition"
            >
              {slide.btnText}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurr(i);
              setImageLoaded(false);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              curr === i ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
