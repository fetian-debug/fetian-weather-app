import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional Weather App",
  description: "Get accurate weather information for any location worldwide",
  keywords: ["weather", "forecast", "temperature", "climate"],
  authors: [{ name: "Weather App Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600">
          {children}
        </div>
      </body>
    </html>
  );
}
