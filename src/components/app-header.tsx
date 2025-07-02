import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="bg-white sticky top-0 z-50 border-b">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-foreground"
        >
          <span className="text-red-500">SEOBLOG</span>
        </Link>
        <nav>
           <Button asChild variant="ghost">
            <Link href="/admin">
              Manage Content
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
