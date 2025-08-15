import { signIn } from "next-auth/react";
import { useState } from "react";

export function useDemoSignin(redirect = false) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function logIn() {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: "email@email.com",
        password: "123123",
        redirect: false,
      });

      if (res?.ok) {
        if (redirect) {
          location.replace("/");
        }
      } else if (res?.error) {
        setError("Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    signIn: logIn,
    isLoading,
    error,
  };
}
