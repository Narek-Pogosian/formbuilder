"use client";

import { Link, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  XIcon,
} from "react-share";

export default function SharePopover({ id }: { id: number }) {
  const [open, setOpen] = useState(false);

  const url =
    typeof window !== "undefined" ? `${window.location.origin}/form/${id}` : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" title="Share">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share form</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit gap-2 p-4">
        <CopyToClipboard url={url} setOpen={setOpen} />
        <TwitterShareButton url={url}>
          <span className="sr-only">Share on Twitter</span>
          <XIcon className="size-16 rounded" />
        </TwitterShareButton>
        <FacebookShareButton url={url}>
          <span className="sr-only">Share on Facebook</span>
          <FacebookIcon className="size-16 rounded" />
        </FacebookShareButton>
      </PopoverContent>
    </Popover>
  );
}

function CopyToClipboard({
  url,
  setOpen,
}: {
  url: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  }

  return (
    <Button
      className="size-16 border-0"
      onClick={handleCopy}
      title="Copy link to clipboard"
    >
      <span className="sr-only">Copy to clipboard</span>
      <Link className="size-7" />
    </Button>
  );
}
