import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AENGEL — Design Engineer",
  description: "An immersive portfolio experience inspired by real-time 3D, code and motion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}