"use client";

import { Button } from "../ui/button";
import { useFormStore } from "./store";

export default function Builder() {
  const fields = useFormStore((state) => state.fields);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <Title />

      <p className="text-primary-text">Sortable list of readonly fields</p>
      <div className="mb-8">{JSON.stringify(fields, null, 2)}</div>

      <Button variant="secondary" size="sm">
        Add field
      </Button>
    </div>
  );
}

function Title() {
  const title = useFormStore((state) => state.settings.title);
  const setTitle = useFormStore((state) => state.setTitle);

  return (
    <input
      aria-label="Title of form"
      type="text"
      className="mb-4 w-full py-2 text-3xl font-bold outline-0"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Untitled Form"
    />
  );
}
