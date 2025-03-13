"use client";

import FormRenderer from "./builder/renderer";
import { useFormStore } from "./builder/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

export default function PreviewDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Eye /> Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="py-14 sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center">Preview</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
}

function Content() {
  const fields = useFormStore((state) => state.fields);

  return <FormRenderer survey={fields} onSubmit={() => {}} />;
}
