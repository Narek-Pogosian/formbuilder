import { getServerAuthSession } from "@/server/auth";
import { getAllForms } from "@/server/queries/form";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import FormCard from "./_components/form-card";
import SignOut from "@/components/sign-out";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/landing");
  }

  const forms = await getAllForms(session.user.id);

  return (
    <div className="relative mx-auto w-full max-w-[1740px] px-4 lg:px-8">
      <header className="sticky top-3 left-0 z-40 mb-10">
        <div className="card flex items-center justify-between px-4 py-2">
          <div className="flex md:gap-1">
            <p className="font-bold uppercase">Formbuilder</p>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            <SignOut />
            <Button size="sm" asChild>
              <Link href="/create">Create a form</Link>
            </Button>
          </div>
        </div>
      </header>

      {forms.length === 0 ? (
        <div className="mx-auto pt-24 text-center">
          <h2 className="mb-6 text-lg font-bold">
            You haven&apos;t created a form yet.
          </h2>
          <Button asChild>
            <Link href="/create">Create a form</Link>
          </Button>
        </div>
      ) : (
        <ul className="md:grid-cols-s grid gap-8 lg:grid-cols-3">
          {forms.map((form) => (
            <li key={form.id}>
              <FormCard form={form} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
