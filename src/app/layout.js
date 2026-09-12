import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Roganda Photo/Foto Palembang",
  description:
    "cetak dan dokumentasikan momen penting anda bersama kami Roganda Photo Palembang",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} h-full antialiased `}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
