import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Wedding Expense Tracker",
  description: "Track your wedding budget, expenses, and savings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased full-background`}
      style={{
        backgroundImage: `
            linear-gradient(
              rgba(250, 225, 242, 0.6), 
              rgba(245, 228, 231, 0.8)    
            ),
                    
          `,
      }}
    >
      <body className="min-h-screen flex flex-col ">
        {/* Floating petals */}
        <div
          className="petal"
          style={{ left: "10%", animationDuration: "8s", animationDelay: "0s" }}
        ></div>
        <div
          className="petal"
          style={{
            left: "30%",
            animationDuration: "12s",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="petal"
          style={{
            left: "50%",
            animationDuration: "10s",
            animationDelay: "5s",
          }}
        ></div>
        <div
          className="petal"
          style={{
            left: "70%",
            animationDuration: "14s",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="petal"
          style={{ left: "90%", animationDuration: "9s", animationDelay: "3s" }}
        ></div>

        {/* Overlay for readability */}
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
