"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function HomeLink() {
  const session = useSession();

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href={session.status === "authenticated" ? "/" : "/landing"}>
        <Home className="size-5" />
        <span className="sr-only">Home</span>
      </Link>
    </Button>
  );
}
