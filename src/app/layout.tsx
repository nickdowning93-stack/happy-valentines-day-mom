import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Valentine's Day, Mom!",
  description: "A special Valentine's Day surprise from Johnny and James",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
