import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from "@/components/analytics/google-analytics";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "AutoNegocie",
  manifest: "site.webmanifest",
  description: "Venda de veiculos",
  icons: {
    icon: "/icons/logo.svg",
    shortcut: "/icons/logo.svg",
    apple: "/icons/logo.svg",
    other: {
      rel: "apple-touch-icon",
      url: "/icons/logo.svg",
      sizes: "180x180",
      type: "image/svg+xml",
      media:
        "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      fetchPriority: "high",
      color: "#000000",
    },
    origin: "https://autonegocie.com.br",
  },
  other: {
    "facebook-domain-verification": "eca4hpikk17nstym5cd7hep5q0weew",
  },
  authors: [{ name: "AutoNegocie" }],
  category: "Venda de veículos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="notranslate" translate="no">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <GoogleAnalytics />
      <body className={cn("min-h-screen", poppins.className)}>
        <Header />
        {children}
        <Footer />
        <Toaster />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9C3EF7H9PF"
        ></script>
      </body>
    </html>
  );
}
