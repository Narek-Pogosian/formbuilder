import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroImage from "@/components/hero-image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroImage />
      <section className="container pt-28 text-center lg:pt-52">
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
          Ask, Analyze, Act
        </h1>
        <div className="mx-auto mb-12 max-w-3xl text-balance">
          <p className="text-foreground-muted md:text-lg">
            Create powerful surveys that drive results. Collect feedback,
            uncover trends, and make data-driven decisions with ease.
          </p>
        </div>
        <Button variant="accent" asChild>
          <Link href="/create">
            Create a free form <ArrowRight />
          </Link>
        </Button>
      </section>
    </>
  );
}
