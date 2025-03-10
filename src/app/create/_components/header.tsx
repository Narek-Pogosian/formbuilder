import { Eye, Home, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between px-2 py-2 md:px-4">
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <Home className="size-5" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>
        <ThemeToggle />
      </div>

      <div className="flex items-center md:gap-4">
        <Button size="sm" variant="ghost" className="text-primary-text">
          <Settings /> Settings
        </Button>
        <Button size="sm" variant="ghost">
          <Eye /> Preview
        </Button>
        <Button size="sm">Publish</Button>
      </div>
    </header>
  );
}

export default Header;
