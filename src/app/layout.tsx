import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";

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
    <ClerkProvider>
      <html lang="en">
        {/* 2. Update body classes for sticky footer */}
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          {/* 3. Main content grows to fill space */}
          <div className="flex-1">{children}</div>

          {/* 4. Global Footer sits at the bottom */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
