import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motu — Crew Management",
  description:
    "Motukarara Powerline Vegetation Contract Crew Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#2E86AB" />
      </head>
      <body className="font-sans">
        <Navigation />
        <main className="md:ml-56 pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
