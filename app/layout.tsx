import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kingsley Chinecherem Ibeh — Full-Stack Engineer",
  description: "Personal portfolio of Kingsley Chinecherem Ibeh (Neche), a full-stack engineer specializing in highly optimized React, Next.js, and strictly structured Node/PostgreSQL backend architectures.",
  keywords: ["Kingsley Chinecherem Ibeh", "Neche", "Full-Stack Engineer", "Backend Developer", "React Developer", "Next.js", "Tailwind CSS", "Web Developer Portfolio"],
  authors: [{ name: "Kingsley Chinecherem Ibeh", url: "https://github.com/kingsleychinecheremibeh" }],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
