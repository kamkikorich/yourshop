import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Borneo Fresh Seafood - Hasil Laut Segar Dari Borneo",
  description: "Jualan hasil laut segar dari Borneo. Udang, ikan, dan ketam berkualiti tinggi dihantar segar ke rumah anda.",
  keywords: "hasil laut, borneo, udang segar, ikan segar, seafood borneo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body className={`${geistSans.variable} antialiased bg-gradient-to-b from-ocean-light/30 to-fresh-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
