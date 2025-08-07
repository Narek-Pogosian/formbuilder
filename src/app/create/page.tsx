import { SettingsDialog } from "@/components/builder/components/settings";
import SessionsProvider from "@/components/session-provider";
import PreviewDialog from "@/components/builder/components/dialogs/preview-dialog";
import PublishDialog from "@/components/builder/components/dialogs/publish-dialog";
import ThemeToggle from "@/components/theme-toggle";
import HomeLink from "./_components/home-link";
import Builder from "@/components/builder";

export default function CreatePage() {
  return (
    <SessionsProvider>
      <div className="relative mx-auto w-full max-w-[1740px] px-4 lg:px-8">
        <header className="sticky top-3 left-0 z-40 mb-10">
          <div className="card flex items-center justify-between px-4 py-2">
            <div className="flex md:gap-1">
              <HomeLink />
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-1 md:gap-4">
              <SettingsDialog />
              <PreviewDialog />
              <PublishDialog />
            </div>
          </div>
        </header>
        <Builder />
      </div>
    </SessionsProvider>
  );
}
