"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useFormStore } from "../../hooks/use-form-store";
import FormRenderer from "@/components/renderer";

export default function PreviewDialog() {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ size: "sm", variant: "ghost" })}
      >
        <Eye /> <span className="max-sm:sr-only">Preview</span>
      </DialogTrigger>
      <DialogContent className="md:max-2w-xl overflow-y-scroll py-12 lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Preview</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
}

function Content() {
  const fields = useFormStore((state) => state.fields);

  return (
    <div>
      <FormRenderer fields={fields} onSubmit={(data: unknown) => alert(data)} />
    </div>
  );
}
