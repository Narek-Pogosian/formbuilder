"use client";

import { useFormStore } from "../hooks/use-form-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function SettingsForm() {
  const settings = useFormStore((state) => state.settings);
  const setSettings = useFormStore((state) => state.setSettings);

  return (
    <form className="@container grid gap-10">
      <div className="flex flex-col gap-2 @xl:flex-row @xl:gap-8">
        <div className="shrink-0 @md:w-72">
          <Label htmlFor="title1" className="mb-1">
            Title
          </Label>
          <p id="title-description" className="text-foreground-muted text-sm">
            The main title of your form
          </p>
        </div>

        <Input
          id="title1"
          type="text"
          aria-describedby="title-description"
          placeholder="Enter a title..."
          value={settings.title}
          onChange={(e) =>
            setSettings({
              title: e.target.value,
              description: settings.description,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2 @xl:flex-row @xl:gap-8">
        <div className="shrink-0 @md:w-72">
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <p id="description-help" className="text-foreground-muted text-sm">
            Give you respondents more information about what this form is about
          </p>
        </div>

        <Textarea
          id="description"
          aria-describedby="description-help"
          placeholder="Enter a description..."
          value={settings.description}
          onChange={(e) =>
            setSettings({
              title: settings.title,
              description: e.target.value,
            })
          }
        />
      </div>
    </form>
  );
}

export function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-primary-text">
          <Settings />
          <span className="max-sm:sr-only"> Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl md:p-12">
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Settings</DialogTitle>
          <DialogDescription className="text-foreground-muted mb-6"></DialogDescription>
        </DialogHeader>
        <SettingsForm />
      </DialogContent>
    </Dialog>
  );
}
