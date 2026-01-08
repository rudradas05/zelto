// "use client";

// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
// import {
//   Menu,
//   X,
//   LogOut,
//   User,
//   Search,
//   ShoppingCart,
//   Package,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// export default function Navbar() {
//   const { data: session, status } = useSession();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [avatarOpen, setAvatarOpen] = useState(false);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

//   const [cartCount, setCartCount] = useState(0);

//   const avatarRef = useRef<HTMLDivElement>(null);

//   // Close avatar dropdown on outside click
//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
//         setAvatarOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   useEffect(() => {
//     console.log("SESSION:", session);
//     console.log("USER IMAGE:", session?.user?.image);
//   }, [session]);

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg">
//       <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="text-2xl font-bold tracking-tight text-green-600"
//         >
//           Zelto
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex ml-8 items-center gap-8">
//           <Link
//             className="text-base font-medium text-gray-700 hover:text-green-600"
//             href="/"
//           >
//             Home
//           </Link>
//           <Link
//             className="text-base font-medium text-gray-700 hover:text-green-600"
//             href="/features"
//           >
//             Features
//           </Link>
//         </nav>

//         {/* Desktop Search */}
//         <form className="hidden md:flex flex-1 justify-center">
//           <div className="relative w-full max-w-lg">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               placeholder="Search..."
//               className="w-full rounded-xl border px-12 py-2.5 text-base focus:border-green-500 focus:ring-4 focus:ring-green-100"
//             />
//           </div>
//         </form>

//         {/* Right section */}
//         <div className="ml-auto flex items-center gap-3">
//           {/* Mobile Search Icon */}
//           <button
//             onClick={() => setMobileSearchOpen((p) => !p)}
//             className="md:hidden rounded-lg p-2 hover:bg-gray-100"
//           >
//             {mobileSearchOpen ? <X size={22} /> : <Search size={22} />}
//           </button>

//           {/* Cart */}
//           <Link
//             href="/cart"
//             className="relative rounded-lg p-2 hover:bg-gray-100"
//           >
//             <ShoppingCart size={22} />
//             <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white">
//               {cartCount}
//             </span>
//           </Link>

//           {/* Avatar */}
//           {/* {status === "authenticated" ? (
//             <div ref={avatarRef} className="relative">
//               <button
//                 onClick={() => setAvatarOpen((p) => !p)}
//                 className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-green-600 hover:ring-2 hover:ring-green-200"
//               >
//                 {session.user?.image ? (
//                   <img
//                     src={session.user.image}
//                     alt="avatar"
//                     className="h-9 w-9 rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-lg font-semibold text-green-600">
//                     {session.user?.name?.[0]}
//                   </span>
//                 )}
//               </button>

//               <AnimatePresence>
//                 {avatarOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.18 }}
//                     className="absolute right-0 mt-3 w-48 rounded-xl border bg-white shadow-xl"
//                   >
//                     <Link
//                       href="/profile"
//                       className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100"
//                       onClick={() => setAvatarOpen(false)}
//                     >
//                       <User size={18} /> Profile
//                     </Link>

//                     <Link
//                       href="/orders"
//                       className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100"
//                       onClick={() => setAvatarOpen(false)}
//                     >
//                       <Package size={18} /> My Orders
//                     </Link>

//                     <button
//                       onClick={() => signOut()}
//                       className="flex w-full items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-gray-100"
//                     >
//                       <LogOut size={18} /> Logout
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ) : (
//             <Link
//               href="/sign-in"
//               className="rounded-lg border-2 border-green-600 px-5 py-2 font-semibold text-green-600"
//             >
//               Login
//             </Link>
//           )} */}
//           {/* Avatar */}
//           {status === "loading" ? null : status === "authenticated" ? (
//             <div ref={avatarRef} className="relative">
//               <button
//                 onClick={() => setAvatarOpen((p) => !p)}
//                 className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-green-600 hover:ring-2 hover:ring-green-200"
//               >
//                 {session?.user?.image ? (
//                   <img
//                     key={session.user.image} // 👈 forces re-render when image arrives
//                     src={session.user.image}
//                     alt="avatar"
//                     className="h-9 w-9 rounded-full object-cover"
//                     referrerPolicy="no-referrer"
//                   />
//                 ) : (
//                   <span className="text-lg font-semibold text-green-600">
//                     {session?.user?.name?.[0]}
//                   </span>
//                 )}
//               </button>

//               <AnimatePresence>
//                 {avatarOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.18 }}
//                     className="absolute right-0 mt-3 w-48 rounded-xl border bg-white shadow-xl"
//                   >
//                     <Link
//                       href="/profile"
//                       className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100"
//                       onClick={() => setAvatarOpen(false)}
//                     >
//                       <User size={18} /> Profile
//                     </Link>

//                     <Link
//                       href="/orders"
//                       className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100"
//                       onClick={() => setAvatarOpen(false)}
//                     >
//                       <Package size={18} /> My Orders
//                     </Link>

//                     <button
//                       onClick={() => signOut()}
//                       className="flex w-full items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-gray-100"
//                     >
//                       <LogOut size={18} /> Logout
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ) : (
//             <Link
//               href="/sign-in"
//               className="rounded-lg border-2 border-green-600 px-5 py-2 font-semibold text-green-600"
//             >
//               Login
//             </Link>
//           )}

//           {/* Hamburger */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="md:hidden rounded-lg p-2 hover:bg-gray-100"
//           >
//             {menuOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Search */}
//       {mobileSearchOpen && (
//         <div className="md:hidden border-t bg-white px-6 py-4">
//           <form className="relative">
//             {/* Search icon */}
//             <Search
//               size={20}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             {/* Input */}
//             <input
//               autoFocus
//               type="text"
//               placeholder="Search..."
//               className="w-full rounded-xl border px-12 pr-12 py-2.5 text-base focus:border-green-500 focus:ring-4 focus:ring-green-100"
//             />

//             {/* Close (X) button */}
//             <button
//               type="button"
//               onClick={() => setMobileSearchOpen(false)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-gray-100"
//               aria-label="Close search"
//             >
//               <X size={18} />
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden border-t bg-white px-6 py-5">
//           <nav className="flex flex-col gap-4 text-base font-medium">
//             <Link href="/">Home</Link>
//             <Link href="/features">Features</Link>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  Menu,
  X,
  LogOut,
  User,
  Search,
  ShoppingCart,
  Package,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { data: session, status } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [cartCount] = useState(0);

  const avatarRef = useRef<HTMLDivElement>(null);

  // Close avatar dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          Zelto
        </Link>

        {/* Desktop Nav */}
        <nav className="ml-8 hidden md:flex items-center gap-8">
          <Link
            className="font-medium text-gray-700 hover:text-green-600"
            href="/"
          >
            Home
          </Link>
          <Link
            className="font-medium text-gray-700 hover:text-green-600"
            href="/features"
          >
            Features
          </Link>
        </nav>

        {/* Desktop Search */}
        <form className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search..."
              className="w-full rounded-xl border px-12 py-2.5 focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </div>
        </form>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-3">
          {/* Mobile Search */}
          <button
            onClick={() => setMobileSearchOpen((p) => !p)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100"
          >
            {mobileSearchOpen ? <X size={22} /> : <Search size={22} />}
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative rounded-lg p-2 hover:bg-gray-100"
          >
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
              {cartCount}
            </span>
          </Link>

          {/* Avatar */}
          {status === "loading" ? (
            <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
          ) : status === "authenticated" ? (
            <div ref={avatarRef} className="relative">
              <button
                onClick={() => setAvatarOpen((p) => !p)}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-green-600 hover:ring-2 hover:ring-green-200"
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="avatar"
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    priority
                  />
                ) : (
                  <span className="font-semibold text-green-600">
                    {session?.user?.name?.[0]}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {avatarOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-48 rounded-xl border bg-white shadow-xl"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100"
                      onClick={() => setAvatarOpen(false)}
                    >
                      <User size={18} /> Profile
                    </Link>

                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100"
                      onClick={() => setAvatarOpen(false)}
                    >
                      <Package size={18} /> My Orders
                    </Link>

                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-lg border-2 border-green-600 px-5 py-2 font-semibold text-green-600"
            >
              Login
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4">
          <input
            autoFocus
            placeholder="Search..."
            className="w-full rounded-xl border px-4 py-2.5 focus:border-green-500 focus:ring-4 focus:ring-green-100"
          />
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-5">
          <nav className="flex flex-col gap-4 font-medium">
            <Link href="/">Home</Link>
            <Link href="/features">Features</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
