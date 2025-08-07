"use client";

import { BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormStore } from "../../hooks/use-form-store";
import { useSession } from "next-auth/react";
import { createForm } from "@/server/actions/form";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PublishDialog() {
  const session = useSession();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <BookOpen /> Publish
        </Button>
      </DialogTrigger>
      <DialogContent>
        {session.status === "authenticated" ? (
          <AuthenticatedHeader />
        ) : (
          <NotAuthenticatedHeader />
        )}

        {session.status === "authenticated" ? (
          <AuthenticatedContent />
        ) : (
          <NotAuthenticatedContent />
        )}
      </DialogContent>
    </Dialog>
  );
}

function NotAuthenticatedHeader() {
  return (
    <DialogHeader className="mb-4">
      <DialogTitle className="text-3xl font-extrabold">Sign in</DialogTitle>
      <DialogDescription>
        To save a form you need to be signed
      </DialogDescription>
    </DialogHeader>
  );
}

function AuthenticatedHeader() {
  return (
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold">Publish</DialogTitle>
      <DialogDescription></DialogDescription>
    </DialogHeader>
  );
}

function NotAuthenticatedContent() {
  return (
    <div>
      <Button className="w-full" asChild>
        <Link href="/login">Sign in</Link>
      </Button>
    </div>
  );
}

function AuthenticatedContent() {
  const settings = useFormStore((state) => state.settings);
  const fields = useFormStore((state) => state.fields);
  const reset = useFormStore((state) => state.reset);

  const router = useRouter();

  const isValidTitle = Boolean(settings.title.trim());
  const isValidFields = Boolean(fields.length);

  const { executeAsync, isPending, hasErrored } = useAction(createForm, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setTimeout(() => reset(), 650);
        router.push("/");
      }
    },
  });

  async function handlePublish() {
    if (!isValidFields || !isValidTitle) return;

    await executeAsync({
      title: settings.title,
      description: settings.description,
      form: fields,
    });
  }

  return (
    <div className="-mt-3">
      <div className="mb-6 grid gap-4">
        <div>
          <p className="font-semibold">Title</p>
          <p className="text-foreground-muted">
            {settings.title.trim() || "No title set"}
          </p>
        </div>

        <div>
          <p className="font-semibold">Description</p>
          <p
            title={settings.description}
            className="text-foreground-muted line-clamp-4"
          >
            {settings.description || "No description"}
          </p>
        </div>
      </div>

      {(!isValidTitle || !isValidFields || hasErrored) && (
        <ul className="bg-danger/6 border-danger/50 mb-6 list-disc space-y-2 rounded border-2 py-2.5 pr-4 pl-8">
          {!isValidTitle && (
            <li className="text-danger-text text-sm font-medium">
              You need to enter a title for the form in settings.
            </li>
          )}
          {!isValidFields && (
            <li className="text-danger-text text-sm font-medium">
              You need add at least one field to the form.
            </li>
          )}
          {hasErrored && (
            <li className="text-danger-text text-sm font-medium">
              Something went wrong.
            </li>
          )}
        </ul>
      )}

      <Button
        size="sm"
        className="w-full"
        disabled={!isValidFields || !isValidTitle}
        loading={isPending}
        onClick={handlePublish}
      >
        Publish
      </Button>
    </div>
  );
}
