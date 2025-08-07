import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { forms } from "@/server/db/schema";
import { db } from "@/server/db";
import SignOut from "@/components/sign-out";

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/landing");
  }

  const res = await db
    .select({
      id: forms.id,
      title: forms.title,
      cancelled: forms.cancelled,
      description: forms.description,
      createdAt: forms.createdAt,
    })
    .from(forms)
    .where(eq(forms.createdById, session.user.id))
    .orderBy(desc(forms.createdAt));

  return (
    <div>
      <h1>Home page</h1>
      <SignOut />
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
}
