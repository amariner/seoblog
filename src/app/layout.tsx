import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "AstroBlog",
  description: "A complete blog site built with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
