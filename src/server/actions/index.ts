import { createSafeActionClient } from "next-safe-action";
import { getServerAuthSession } from "../auth";

export const actionClient = createSafeActionClient();

export const protectedActionClient = actionClient.use(async ({ next }) => {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("Session not found!");
  }

  if (!session.user.id) {
    throw new Error("Session is not valid!");
  }

  return next({ ctx: { userId: session.user.id } });
});
