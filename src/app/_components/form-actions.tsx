"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { cancelForm, deleteForm } from "@/server/actions/form";
import { Ellipsis, Trash2, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

export default function FormActions({
  id,
  cancelled,
}: {
  id: number;
  cancelled: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis className="size-6" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {!cancelled && <Cancel id={id} />}
        <Delete id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Delete({ id }: { id: number }) {
  const { execute } = useAction(deleteForm);

  return (
    <DropdownMenuItem variant="danger" onSelect={() => execute(id)}>
      <Trash2 /> Delete Form
    </DropdownMenuItem>
  );
}

function Cancel({ id }: { id: number }) {
  const { execute } = useAction(cancelForm);

  return (
    <DropdownMenuItem onSelect={() => execute(id)}>
      <X /> Cancel Form
    </DropdownMenuItem>
  );
}
