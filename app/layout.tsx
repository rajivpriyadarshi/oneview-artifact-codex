import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oneview Threads · Manage tech concentration",
  description: "An interactive concept prototype for a living wealth-management concentration review.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
