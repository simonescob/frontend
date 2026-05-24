import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PitchLens — VC-Grade Analysis in Seconds",
  description:
    "Upload your pitch deck or financial report and get instant structured analysis — risks, market assumptions, red flags, and VC-style questions.",
  keywords: ["venture capital", "pitch deck analysis", "AI due diligence", "founder tools", "startup analysis", "investment analysis"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "PitchLens — VC-Grade Analysis in Seconds",
    description:
      "Upload your pitch deck or financial report and get instant structured analysis — risks, market assumptions, red flags, and VC-style questions.",
    siteName: "PitchLens",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PitchLens — VC-Grade Analysis in Seconds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchLens — VC-Grade Analysis in Seconds",
    description:
      "Upload your pitch deck or financial report and get instant structured analysis — risks, market assumptions, red flags, and VC-style questions.",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}