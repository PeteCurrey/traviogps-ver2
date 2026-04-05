import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MainProvider } from "@/components/providers/MainProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Travio GPS | Advanced Fleet Tracking & Dash Cams",
  description: "Secure, reliable, and innovative GPS tracking solutions for businesses of all sizes. Monitor your fleet in real-time with Travio GPS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased font-sans`}>
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
