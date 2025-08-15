import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import BackButton from "./_components/back-button";

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
    <div className="via-background relative min-h-full content-center bg-gradient-to-b from-white/6 to-white/2 px-4 lg:col-span-2">
      <BackButton />
      <div className="card mx-auto max-w-lg rounded p-8">{children}</div>
    </div>
  );
}
