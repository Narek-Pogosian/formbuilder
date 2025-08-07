"use server";

import { registerSchema } from "@/lib/schemas/auth-schemas";
import { actionClient } from ".";
import { users } from "../db/schema";
import { db } from "../db";
import bcrypt from "bcrypt";

export const registerAction = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const hashedPassword = bcrypt.hashSync(parsedInput.password, 10);

    const user = await db
      .insert(users)
      .values({
        email: parsedInput.email,
        name: parsedInput.name,
        hashedPassword,
      })
      .returning();

    if (!user) {
      throw Error("Something went wrong");
    }

    return { email: parsedInput.email, password: parsedInput.password };
  });
