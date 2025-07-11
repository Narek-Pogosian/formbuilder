import Builder from "@/components/builder";
import PreviewDialog from "@/components/builder/dialogs/preview-dialog";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { BookOpen, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="relative mx-auto w-full max-w-[1740px] px-4 lg:px-8">
      <header className="sticky top-3 left-0 z-40 mb-10">
        <div className="card flex items-center justify-between px-4 py-2">
          <div className="flex md:gap-2">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:gap-4">
            <Button className="text-primary-text" variant="ghost" size="sm">
              <Settings /> <span className="max-md:sr-only">Settings</span>
            </Button>
            <PreviewDialog />
            <Button size="sm">
              <BookOpen /> Publish
            </Button>
          </div>
        </div>
      </header>

      <Builder />
    </div>
  );
}
