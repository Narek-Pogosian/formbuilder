"use client";

import { Button } from "@/components/ui/button";
import { useFormStore } from "../store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FieldDialogContent from "./content";

export default function FieldDialog() {
  const isOpen = useFormStore((state) => state.fieldDialog.isOpen);
  const setFieldDalogOpen = useFormStore((state) => state.setFieldDalogOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setFieldDalogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Add field
        </Button>
      </DialogTrigger>
      <DialogContent className="data-[state=closed]:animate-none data-[state=closed]:duration-0 md:p-8">
        <DialogHeader>
          <DialogTitle className="sr-only">Fields</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FieldDialogContent />
      </DialogContent>
    </Dialog>
  );
}
