"use server";

import { protectedActionClient } from ".";
import { revalidatePath } from "next/cache";
import { formSchema } from "@/lib/schemas/form-schemas";
import { forms } from "../db/schema";
import { db } from "../db";
import z from "zod";

const createFormScema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  description: z.string().trim().optional(),
  form: formSchema,
});

export const createForm = protectedActionClient
  .schema(createFormScema)
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
