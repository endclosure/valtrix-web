"use client";

import { CopyIcon, CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { Command } from "@/types/commands";
import { cn } from "@/lib/utils";

interface CommandHeaderProps {
  command: Command;
  isExpanded: boolean;
  hasContent: boolean;
}

export function CommandHeader({
  command,
  isExpanded,
  hasContent,
}: CommandHeaderProps) {
  const formattedName = `,${command.name}`;
  const [copied, setCopied] = useState(false);

  const copyCommand = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(formattedName);
      setCopied(true);
      toast.success(`Copied ${formattedName} to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 min-w-0">
        <div className="flex items-center gap-1 font-mono text-base font-semibold text-white tracking-wide group-hover:text-[#7aa8e0] transition-colors truncate">
          <span className="text-[#7aa8e0] font-bold">,</span>
          <span className="truncate">{command.name}</span>
        </div>

        <button
          onClick={copyCommand}
          className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          title="Copy command"
          aria-label="Copy command"
        >
          {copied ? (
            <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <CopyIcon className="w-3.5 h-3.5" />
          )}
        </button>

        {command.donor && (
          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
            Donor
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {hasContent && (
          <div className="p-1 rounded-md text-white/40 group-hover:text-white transition-colors">
            <ChevronDownIcon
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isExpanded && "rotate-180 text-[#7aa8e0]"
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
