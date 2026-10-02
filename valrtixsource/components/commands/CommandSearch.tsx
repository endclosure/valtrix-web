"use client";

import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Command } from "@/types/commands";
import { categories } from "@/data/categories";

interface CommandSearchProps {
  commands: Command[];
  onSelectCategory: (_category: string) => void;
  onSelectCommand: (_name: string) => void;
}

export function CommandSearch({ commands, onSelectCategory, onSelectCommand }: CommandSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const matchedCategories = query.trim()
    ? categories.filter(
        (c) => c.name !== "All" && c.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedCommands = query.trim()
    ? commands
        .filter(
          (cmd) =>
            cmd.name.toLowerCase().includes(query.toLowerCase()) ||
            cmd.description.toLowerCase().includes(query.toLowerCase()) ||
            cmd.aliases?.some((a) => a.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 6)
    : [];

  const hasResults = matchedCategories.length > 0 || matchedCommands.length > 0;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative group">
        <div className="absolute inset-0 bg-white/[0.03] rounded-xl border border-white/10 group-focus-within:border-[#7aa8e0]/50 transition-colors" />
        <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#7aa8e0] transition-colors pointer-events-none z-10" />
        <input
          ref={inputRef}
          placeholder="Search commands, syntax, or aliases..."
          className="relative w-full bg-transparent pl-10 pr-9 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none z-10 rounded-xl"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white rounded-md z-10"
            aria-label="Clear search"
          >
            <Cross2Icon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {open && hasResults && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl bg-[#0c121e]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden divide-y divide-white/5">
          {matchedCategories.length > 0 && (
            <div className="p-2">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest px-2 py-1">
                Categories
              </p>
              {matchedCategories.map((cat) => (
                <button
                  key={cat.name}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                  onMouseDown={() => {
                    onSelectCategory(cat.name);
                    setQuery("");
                    setOpen(false);
                  }}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-[#7aa8e0]">View category</span>
                </button>
              ))}
            </div>
          )}

          {matchedCommands.length > 0 && (
            <div className="p-2">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest px-2 py-1">
                Commands
              </p>
              {matchedCommands.map((cmd) => (
                <button
                  key={cmd.name}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group flex items-start justify-between gap-3"
                  onMouseDown={() => {
                    onSelectCommand(cmd.name);
                    setQuery("");
                    setOpen(false);
                  }}
                >
                  <div>
                    <span className="text-sm font-mono font-semibold text-white group-hover:text-[#7aa8e0] transition-colors">
                      ,{cmd.name}
                    </span>
                    <p className="text-xs text-white/50 line-clamp-1 mt-0.5">{cmd.description}</p>
                  </div>
                  {cmd.cog && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 shrink-0">
                      {cmd.cog}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
