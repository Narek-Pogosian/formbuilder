"use server";

import { actionClient } from ".";
import { responses } from "../db/schema";
import { db } from "../db";
import { z } from "zod";

export const respond = actionClient
  .inputSchema(
    z.object({
      formId: z.number(),
      answers: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      await db.insert(responses).values({
        formId: parsedInput.formId,
        answers: parsedInput.answers,
      });

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  });
