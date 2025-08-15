"use server";

import { protectedActionClient } from ".";
import { revalidatePath } from "next/cache";
import { formSchema } from "@/lib/schemas/form-schemas";
import { forms } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";
import z from "zod";

const createFormScema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  description: z.string().trim().optional(),
  form: formSchema,
});

export const createForm = protectedActionClient
  .inputSchema(createFormScema)
  .action(async ({ parsedInput, ctx }) => {
    const form = await db
      .insert(forms)
      .values({
        title: parsedInput.title,
        description: parsedInput.description,
        content: JSON.stringify(parsedInput.form),
        createdById: ctx.userId,
        cancelled: false,
      })
      .returning();

    if (form) {
      revalidatePath("/");
      return { success: true };
    }

    return { success: false };
  });

export const deleteForm = protectedActionClient
  .inputSchema(z.number())
  .action(async ({ ctx, parsedInput }) => {
    const res = await db
      .select()
      .from(forms)
      .where(eq(forms.id, parsedInput))
      .limit(1);
    const form = res[0];

    if (!form || form.createdById !== ctx.userId) {
      return { success: false };
    }

    await db.delete(forms).where(eq(forms.id, parsedInput));

    revalidatePath("/");
    return { success: true };
  });

export const cancelForm = protectedActionClient
  .inputSchema(z.number())
  .action(async ({ ctx, parsedInput }) => {
    const res = await db
      .select()
      .from(forms)
      .where(eq(forms.id, parsedInput))
      .limit(1);
    const form = res[0];

    if (!form || form.createdById !== ctx.userId) {
      return { success: false };
    }

    await db
      .update(forms)
      .set({ cancelled: true })
      .where(eq(forms.id, parsedInput));

    revalidatePath("/");
    return { success: true };
  });
