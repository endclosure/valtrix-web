"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "@/types/commands";
import { CommandHeader } from "./CommandHeader";
import { CommandDetails } from "./CommandDetails";
import { cn } from "@/lib/utils";

interface CommandCardProps {
  command?: Command;
  isLoading?: boolean;
}

export function CommandCard({ command, isLoading }: CommandCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const validParameters =
    command?.parameters?.filter(
      (param) => param.name.toLowerCase() !== "none"
    ) || [];

  const hasExpandableContent = Boolean(
    validParameters.length > 0 ||
      command?.usage ||
      (command?.aliases && command.aliases.length > 0) ||
      (command?.permissions && command.permissions.length > 0)
  );

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 bg-white/10 rounded animate-pulse" />
            <div className="h-6 w-6 bg-white/5 rounded-md animate-pulse" />
          </div>
          <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-3/4 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!command) return null;

  return (
    <div
      className={cn(
        "group rounded-2xl border border-white/10 bg-[#090d16]/70 backdrop-blur-md overflow-hidden transition-all duration-200 flex flex-col justify-between",
        hasExpandableContent && "cursor-pointer hover:border-[#7aa8e0]/40 hover:bg-[#0d1424]/80 hover:shadow-lg hover:shadow-[#7aa8e0]/5",
        isExpanded && "border-[#7aa8e0]/40 bg-[#0d1424]/90 shadow-lg shadow-black/40 ring-1 ring-[#7aa8e0]/20"
      )}
      onClick={() => hasExpandableContent && setIsExpanded(!isExpanded)}
    >
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <CommandHeader
            command={command}
            isExpanded={isExpanded}
            hasContent={hasExpandableContent}
          />

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {command.cog && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-white/50 border border-white/10">
                {command.cog}
              </span>
            )}
            {command.aliases && command.aliases.length > 0 && (
              <span className="text-[11px] font-mono text-white/40">
                {command.aliases.slice(0, 2).map((a) => `,${a}`).join(" ")}
                {command.aliases.length > 2 && ` +${command.aliases.length - 2}`}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-white/55 mt-2.5 leading-relaxed line-clamp-2">
            {command.description || "No description available."}
          </p>
        </div>

        {hasExpandableContent && !isExpanded && (
          <p className="text-[11px] text-[#7aa8e0]/70 group-hover:text-[#7aa8e0] mt-3 font-medium transition-colors">
            Click to view syntax & details →
          </p>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && hasExpandableContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CommandDetails command={command} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
