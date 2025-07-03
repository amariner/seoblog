import type { Metadata } from "next";
import "@/app/globals.css";
import { AppHeader } from "@/components/app-header";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "AstroBlog",
  description: "A complete blog site built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <AppHeader />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-white border-t">
            <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center text-sm">
              <p className="text-muted-foreground mb-4 sm:mb-0">
                &copy; {new Date().getFullYear()} AstroBlog. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
