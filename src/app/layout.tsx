import type { Metadata } from "next";
import { Geist, Geist_Mono, Moul, Siemreap } from "next/font/google";
import { SupabaseAuthProvider } from "@/lib/supabase-auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const moul = Moul({
  variable: "--font-moul",
  subsets: ["khmer"],
  weight: "400",
});

const siemreap = Siemreap({
  variable: "--font-siemreap",
  subsets: ["khmer"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Enterprise Finance & Reporting",
  description: "Finance management and modular report system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="km"
      className={`${geistSans.variable} ${geistMono.variable} ${moul.variable} ${siemreap.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <SupabaseAuthProvider>{children}</SupabaseAuthProvider>
      </body>
    </html>
  );
}
