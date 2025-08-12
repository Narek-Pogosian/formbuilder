import { useFormStore } from "../../hooks/use-form-store";
import { type Template, TEMPLATES } from "./data";

export default function TemplatesContent({
  setOpen,
}: {
  setOpen: (b: boolean) => void;
}) {
  const setFields = useFormStore((state) => state.setFields);
  const setSettings = useFormStore((state) => state.setSettings);

  function setTemplate(template: Template) {
    setFields(template.fields);
    setSettings({ title: template.title, description: template.description });
    setOpen(false);
  }

  return (
    <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      {TEMPLATES.map((t, i) => (
        <li key={i}>
          <button
            className="hover:bg-secondary-hover ring-ring focus-visible:bg-secondary-hover cursor-pointer rounded p-4 text-left outline-0 focus-visible:ring-2"
            onClick={() => setTemplate(t)}
          >
            <h3 className="mb-1 font-bold">{t.title}</h3>
            <p className="text-foreground-muted text-sm">
              {t.templateDescription}
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
}
