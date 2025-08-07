"use client";

import { SessionProvider as S } from "next-auth/react";

export default function SessionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <S refetchOnWindowFocus={false}>{children}</S>;
}
