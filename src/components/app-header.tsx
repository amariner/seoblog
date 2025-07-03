"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export function AppHeader() {
  const params = useParams();
  const locale = params.locale || 'en';

  return (
    <header className="bg-white sticky top-0 z-50 border-b">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold text-foreground"
        >
          <span className="text-red-500">SEOBLOG</span>
        </Link>
        <nav>
           <Button asChild variant="ghost">
            <Link href={`/${locale}/admin`}>
              Manage Content
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
