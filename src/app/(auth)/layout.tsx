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
    <div className="from-background relative min-h-full content-center bg-gradient-to-br to-white/5 px-4 lg:col-span-2">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden transition-opacity dark:block"
        style={{
          background:
            "radial-gradient(600px at 233px 8px, rgba(255, 255, 255, 0.12), transparent 80%)",
        }}
      ></div>
      <BackButton />
      <div className="card mx-auto max-w-lg rounded p-8">{children}</div>
    </div>
  );
}
