import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; // <--- 1. Import this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SubTrack",
  description: "Subscription Analytics Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. Wrap your entire HTML tree with ClerkProvider
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
