import { CheckCircle, FileDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <section className="relative container grid min-h-screen place-content-center">
        <div className="bg-accent shadow-card mx-auto mb-4 w-fit rounded-full px-5 py-1.5 text-sm font-semibold">
          Learning Project
        </div>
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-extrabold lg:text-7xl">
            Build Forms <span className="text-primary-text">Easily</span>
          </h1>

          <p className="text-foreground-muted mx-auto mb-8 max-w-lg font-semibold text-pretty lg:text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            voluptatibus accusamus hic?
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              className="rounded-full px-8 text-base"
              variant="secondary"
              asChild
            >
              <Link href="/login">Sign in</Link>
            </Button>
            <Button className="rounded-full px-8 text-base" asChild>
              <Link href="/create">Create a form</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container pt-6 pb-12 md:pb-20 lg:pb-28">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tighter sm:text-3xl">
          Features
        </h2>

        <div className="grid items-start gap-6 text-center md:grid-cols-3 lg:gap-10">
          <div className="card flex h-full flex-col items-center gap-2 rounded p-8">
            <CheckCircle className="mb-2 size-10" />
            <h3 className="text-xl font-bold">Easy Form Creation</h3>
            <p className="text-foreground-muted text-center">
              Intuitive interface to create forms in minutes
            </p>
          </div>
          <div className="card flex h-full flex-col items-center gap-2 rounded p-8">
            <Share2 className="mb-2 size-10" />
            <h3 className="text-xl font-bold">Simple Sharing</h3>
            <p className="text-foreground-muted text-center">
              Share forms via link or embed on your website
            </p>
          </div>
          <div className="card flex h-full flex-col items-center gap-2 rounded p-8">
            <FileDown className="mb-2 size-10" />
            <h3 className="text-xl font-bold">CSV Export</h3>
            <p className="text-foreground-muted text-center">
              Download form responses as CSV for easy analysis
            </p>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tighter sm:text-3xl">
            How It Works
          </h2>

          <div className="grid items-start gap-6 text-center md:grid-cols-3 lg:gap-10">
            <div className="card flex h-full flex-col items-center gap-2 rounded p-8">
              <div className="bg-primary text-primary-foreground mb-2 size-10 content-center rounded-full text-center text-lg font-bold">
                1
              </div>
              <h3 className="text-xl font-bold">Create Your Form</h3>
              <p className="text-foreground-muted text-center">
                Design your form using our easy-to-use builder
              </p>
            </div>
            <div className="card flex h-full flex-col items-center gap-2 rounded p-8">
              <div className="bg-primary text-primary-foreground mb-2 size-10 content-center rounded-full text-center text-lg font-bold">
                2
              </div>
              <h3 className="text-xl font-bold">Share with Your Audience</h3>
              <p className="text-foreground-muted text-center">
                Distribute your form via a link or embed it on your site
              </p>
            </div>
            <div className="card flex h-full flex-col items-center gap-2 rounded p-8">
              <div className="bg-primary text-primary-foreground mb-2 size-10 content-center rounded-full text-center text-lg font-bold">
                3
              </div>
              <h3 className="text-xl font-bold">Analyze Results</h3>
              <p className="text-foreground-muted text-center">
                View responses in real-time and export as CSV for deeper
                analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 text-center md:py-20 lg:py-24">
        <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl">
          Start Gathering Insights Today
        </h2>
        <Button className="rounded-full px-8 text-base" asChild>
          <Link href="/create">Create a form</Link>
        </Button>
      </section>
    </>
  );
}
