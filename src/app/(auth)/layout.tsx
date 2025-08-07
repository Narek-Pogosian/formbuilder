import { getServerAuthSession } from "@/server/auth";
import { MoveLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (session) {
    throw redirect("/");
  }

  return (
    <div className="relative min-h-full content-center px-4 lg:col-span-2">
      <Button variant="secondary" asChild>
        <Link
          href="/landing"
          className="absolute top-4 left-4 border lg:top-8 lg:left-8"
        >
          <MoveLeft />
          Back
        </Link>
      </Button>

      <div className="card mx-auto max-w-lg rounded p-8">{children}</div>
    </div>
  );
}
