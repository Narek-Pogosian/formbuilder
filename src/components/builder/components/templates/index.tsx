import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspense, useState } from "react";
import { LayoutPanelTop } from "lucide-react";
import dynamic from "next/dynamic";

const TemplatesContent = dynamic(() => import("./content"));

export default function Templates() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <LayoutPanelTop className="size-4" /> Choose a Template
        </Button>
      </DialogTrigger>
      <DialogContent className="p-10 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="mb-8 text-center sm:text-3xl">
            Explore form templates
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Suspense fallback={<p>Loading...</p>}>
          <TemplatesContent setOpen={setOpen} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
