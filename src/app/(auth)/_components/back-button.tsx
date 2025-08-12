"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      role="link"
      variant="secondary"
      className="absolute top-4 left-4 border lg:top-8 lg:left-8 dark:border-white/5"
      onClick={() => router.back()}
    >
      <MoveLeft />
      Back
    </Button>
  );
}
