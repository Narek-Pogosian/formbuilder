import { getServerAuthSession } from "@/server/auth";
import { forms, responses } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const [session, res] = await Promise.all([
    getServerAuthSession(),
    db
      .select()
      .from(forms)
      .where(eq(forms.id, Number(id))),
  ]);

  const form = res[0];
  if (!form) {
    return Response.json({ msg: "Not found" }, { status: 404 });
  }

  if (!session || form.createdById !== session.user.id) {
    return Response.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const responsesArr = await db
    .select()
    .from(responses)
    .where(eq(responses.formId, Number(id)));

  return Response.json(
    { fields: form.content, responses: responsesArr },
    { status: 200 },
  );
}
