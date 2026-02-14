import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://happy-valentines-day-phi-one.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#e63946",
};

export const metadata: Metadata = {
  title: "Happy Valentine's Day, Nana!",
  description:
    "A special Valentine's Day surprise from your favorite grandsons Johnny & James. Click to see our slideshow!",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Happy Valentine's Day, Nana! 💖",
    description:
      "Your favorite grandsons Johnny & James have a special Valentine's surprise for you! XOXO 💋",
    url: siteUrl,
    siteName: "Happy Valentine's Day, Nana!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Valentine's Day, Nana! 💖",
    description:
      "Your favorite grandsons Johnny & James have a special Valentine's surprise for you! XOXO 💋",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Valentine's Day",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
