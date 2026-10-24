import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وكالة الذكاء الرقمية - AI Agency Quote Analyzer",
  description: "قم بإدخال بياناتك لتحليل فكرتك فوراً",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
