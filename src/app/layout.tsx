import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Provider from "@/Provider";

export const metadata: Metadata = {
  title: "Zelto – Get your delivery within 10 minutes!",
  description: "Ultra-fast 10-minute delivery for daily essentials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-linear-to-b from-[#ECFDF5] via-white to-white text-[#020617] antialiased">
        <Provider>{children}</Provider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
