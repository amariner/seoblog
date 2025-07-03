import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "AstroBlog",
  description: "A complete blog site built with Next.js.",
};

// This is the mandatory Root Layout. It cannot be dynamic.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The lang attribute will be inherited by the nested layout
    <html>
      <body>{children}</body>
    </html>
  );
}
