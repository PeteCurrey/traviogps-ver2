import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { MainProvider } from "@/components/providers/MainProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travio | Premium GPS Tracking for Supercars, Luxury Cars & Motorhomes",
  description:
    "Thatcham-certified GPS tracking for supercars, luxury SUVs, motorhomes, caravans, and motorcycles. Real-time tracking, remote immobilisation, 24/7 monitoring. Installed at your door.",
  keywords:
    "GPS tracker, Thatcham S5, Thatcham S7, supercar tracker, luxury car tracker, motorhome tracker, motorcycle tracker, UK",
  openGraph: {
    title: "Travio | Premium GPS Tracking",
    description:
      "Thatcham-certified GPS tracking for supercars, luxury cars & motorhomes. Installed at your door.",
    type: "website",
    locale: "en_GB",
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
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Travio",
              "url": "https://travio.co.uk",
              "logo": "https://travio.co.uk/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "0800-123-4567",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body className="antialiased font-dm-sans bg-travio-bg text-travio-text">
        <MainProvider>
          <LenisProvider>{children}</LenisProvider>
        </MainProvider>
      </body>
    </html>
  );
}
