"use client";

import { getDefaultField } from "../utils/get-default-field";
import { useFormStore } from "../hooks/use-form-store";
import { StickyNote } from "lucide-react";
import { FieldType } from "@/lib/schemas/form-schemas";
import { Button } from "@/components/ui/button";
import { Fields } from "../fields";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function AddField({ fromScratch = false }: { fromScratch?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant={fromScratch ? "ghost" : "outline"}
          className="w-fit"
        >
          {fromScratch ? (
            <>
              <StickyNote className="size-4" /> Start a new form from scratch
            </>
          ) : (
            "Add field"
          )}
        </Button>
      </DialogTrigger>
      {open && (
        <div className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"></div>
      )}

      <Content setOpen={setOpen} />
    </Dialog>
  );
}

function Content({ setOpen }: { setOpen: (b: boolean) => void }) {
  const addField = useFormStore((state) => state.addField);

  function handleAdd(type: string) {
    addField(getDefaultField(type as FieldType));
    setOpen(false);
  }

  return (
    <DialogContent showCloseButton={false} className="max-w-[260px] p-4">
      <DialogHeader>
        <DialogTitle className="sr-only">Add field</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <ul className="-mt-4 grid">
        {Object.entries(Fields).map(([type, field]) => (
          <li key={type}>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleAdd(type)}
            >
              <field.icon />
              {field.label}
            </Button>
          </li>
        ))}
      </ul>
    </DialogContent>
  );
}
