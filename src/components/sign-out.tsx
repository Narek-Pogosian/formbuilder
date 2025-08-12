"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOut() {
  return (
    <Button variant="secondary" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
