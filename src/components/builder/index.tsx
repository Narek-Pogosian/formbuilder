"use client";

import FieldDialog from "./field-dialog";
import SortableList from "./sortable-list";
import { useFormStore } from "./store";

export default function Builder() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <Title />
      <SortableList />
      <FieldDialog />
    </div>
  );
}

function Title() {
  const title = useFormStore((state) => state.settings.title);
  const setTitle = useFormStore((state) => state.setTitle);

  return (
    <input
      id="title"
      aria-label="Title of form"
      type="text"
      className="mb-4 w-full py-2 text-3xl font-bold outline-0"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Untitled Form"
    />
  );
}
