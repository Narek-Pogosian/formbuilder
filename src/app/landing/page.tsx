import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <section className="from-background relative grid min-h-screen place-content-center bg-gradient-to-br to-white/5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden transition-opacity dark:block"
          style={{
            background:
              "radial-gradient(600px at 233px 8px, rgba(255, 255, 255, 0.12), transparent 80%)",
          }}
        ></div>

        <div className="bg-secondary mx-auto mb-4 w-fit rounded-full border px-5 py-1.5 text-sm font-semibold">
          Learning Project
        </div>
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-extrabold lg:text-7xl">
            Build Forms Easily
          </h1>

          <p className="text-foreground-muted mx-auto mb-8 max-w-lg font-semibold text-pretty lg:text-lg">
            Try out this form builder built with React, DnD-Kit, Zod,
            React-Hook-Form and Tailwind CSS.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8"
              variant="secondary"
              asChild
            >
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/create">Create a form</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
