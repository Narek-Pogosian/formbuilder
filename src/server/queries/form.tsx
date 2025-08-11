import { forms, responses } from "../db/schema";
import { count, desc, eq } from "drizzle-orm";
import { db } from "../db";

export async function getAllForms(userId: string) {
  return await db
    .select({
      id: forms.id,
      title: forms.title,
      cancelled: forms.cancelled,
      description: forms.description,
      createdAt: forms.createdAt,
      responseCount: count(responses.id),
    })
    .from(forms)
    .where(eq(forms.createdById, userId))
    .leftJoin(responses, eq(responses.formId, forms.id))
    .groupBy(forms.id)
    .orderBy(desc(forms.createdAt));
}

export async function getFormById(formId: number) {
  const res = await db
    .select()
    .from(forms)
    .where(eq(forms.id, formId))
    .limit(1);

  return res[0];
}
