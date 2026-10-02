"use client";

import { Command } from "@/types/commands";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

interface CommandUsageProps {
  command: Command;
}

export function CommandUsage({ command }: CommandUsageProps) {
  const [copied, setCopied] = useState(false);

  const usageDisplay = command.usage.startsWith(",")
    ? command.usage
    : command.usage.toLowerCase().startsWith(command.name.toLowerCase())
    ? `,${command.usage}`
    : `,${command.name} ${command.usage}`.trim();

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(usageDisplay);
    setCopied(true);
    toast.success("Usage copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7aa8e0]/90">
          Usage Syntax
        </h4>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
          title="Copy syntax"
        >
          {copied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-sm text-white/90 break-all select-all flex items-center justify-between">
        <code>{usageDisplay}</code>
      </div>
    </div>
  );
}
