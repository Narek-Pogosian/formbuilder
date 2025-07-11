"use client";

import { getDefaultField } from "../utils/get-default-field";
import { useFormStore } from "../hooks/use-form-store";
import { Plus, StickyNote } from "lucide-react";
import { FieldType } from "@/lib/schemas/form-schemas";
import { Button } from "@/components/ui/button";
import { Fields } from "../fields";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function AddField({ fromScratch = false }: { fromScratch?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      <Content setOpen={setOpen} />
    </Dialog>
  );
}

export function AddFieldBellow({ index }: { index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary" className="size-8">
          <Plus />
          <span className="sr-only">Add field bellow</span>
        </Button>
      </DialogTrigger>
      <Content setOpen={setOpen} index={index} />
    </Dialog>
  );
}

function Content({
  index,
  setOpen,
}: {
  setOpen: (b: boolean) => void;
  index?: number;
}) {
  const addField = useFormStore((state) => state.addField);

  function handleAdd(type: string) {
    addField(getDefaultField(type as FieldType), index);
    setOpen(false);
  }

  return (
    <DialogContent className="max-w-[270px]">
      <DialogHeader>
        <DialogTitle className="sr-only">Add field</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <ul className="-mt-4 grid gap-1">
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
