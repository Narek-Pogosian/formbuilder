"use client";

import { Button } from "@/components/ui/button";
import { useDemoSignin } from "@/hooks/use-demo-signin";

export default function DemoSignin() {
  const { signIn, isLoading } = useDemoSignin();

  return (
    <Button
      type="button"
      variant="secondary"
      loading={isLoading}
      onClick={signIn}
    >
      Demo Account
    </Button>
  );
}
