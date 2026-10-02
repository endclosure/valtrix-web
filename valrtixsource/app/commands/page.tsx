"use client";

import { Command } from "@/types/commands";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { transformApiCommandsToCommands } from "@/lib/commands";
import Loader from "@/components/loading/Loader";
import {
  LayoutGrid, Shield, Settings, Gamepad2, Globe, Music,
  Users, Bot, Search, ChevronRight, Copy, Check, Sparkles,
} from "lucide-react";

async function fetchCommands(): Promise<Command[]> {
  const response = await fetch("/api/commands");
  if (!response.ok) throw new Error("Couldn't fetch commands");
  const data = await response.json();
  return transformApiCommandsToCommands(data);
}

const TABS = [
  { name: "All", icon: <LayoutGrid size={13} /> },
  { name: "Moderation", icon: <Shield size={13} /> },
  { name: "Configuration", icon: <Settings size={13} /> },
  { name: "Fun", icon: <Gamepad2 size={13} /> },
  { name: "Information", icon: <Globe size={13} /> },
  { name: "Utility", icon: <Bot size={13} /> },
  { name: "Social", icon: <Users size={13} /> },
  { name: "Lastfm", icon: <Music size={13} /> },
  { name: "Extra", icon: <Sparkles size={13} /> },
];

function CommandCard({ command }: { command: Command }) {
  const [copied, setCopied] = useState(false);

  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`/${command.name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/[0.05] p-5 cursor-pointer hover:bg-white/[0.04] transition-all duration-300 h-full flex flex-col shadow-[inset_0px_0px_1px_rgba(255,255,255,0.1)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white/55 truncate">{command.name}</span>
        <button
          onClick={copy}
          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/5 transition-all flex-shrink-0"
        >
          {copied
            ? <Check size={12} className="text-green-400" />
            : <Copy size={12} className="text-white/40" />}
        </button>
      </div>
      <p className="text-sm text-white/60 line-clamp-2 mb-4 flex-grow leading-relaxed">
        {command.description}
      </p>
      <div className="flex items-center justify-end mt-auto pt-3 border-t border-white/[0.05]">
        <ChevronRight size={13} className="text-white/15 group-hover:text-[#7aa8e0]/50 transition-colors" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#7aa8e0]/5 to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 rounded-3xl pointer-events-none" />
    </div>
  );
}

export default function CommandsPage() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(24);
  const observerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCommands()
      .then(setCommands)
      .catch(() => setError("Failed to load commands"))
      .finally(() => setIsLoading(false));
  }, []);

  const cogCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cmd of commands) {
      if (!cmd.cog) continue;
      counts[cmd.cog.trim()] = (counts[cmd.cog.trim()] || 0) + 1;
    }
    return counts;
  }, [commands]);

  const tabCount = (name: string) =>
    name === "All" ? commands.length : cogCounts[name] || 0;

  const filtered = useMemo(() => {
    const byCat =
      activeTab === "All"
        ? commands
        : commands.filter((c) => c.cog?.trim().toLowerCase() === activeTab.toLowerCase());
    if (!searchQuery.trim()) return byCat;
    const q = searchQuery.toLowerCase();
    return byCat.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.aliases?.some((a) => a.toLowerCase().includes(q))
    );
  }, [activeTab, searchQuery, commands]);

  const displayed = useMemo(() => filtered.slice(0, displayCount), [filtered, displayCount]);
  const hasMore = displayCount < filtered.length;
  const loadMore = useCallback(() => setDisplayCount((p) => p + 18), []);

  useEffect(() => { setDisplayCount(24); }, [activeTab, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && hasMore) loadMore(); },
      { threshold: 0.1 }
    );
    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  if (isLoading) {
    return (
      <main className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
          <p className="text-red-300 font-medium mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative pt-16 pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">Commands</h1>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
            Browse all {commands.length} commands — search, filter by category, and explore syntax.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar rounded-2xl bg-white/[0.02] border border-white/[0.04] p-1.5">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.name;
                const count = tabCount(tab.name);
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? "bg-white/[0.08] text-white shadow-[0_4px_12px_rgba(122,168,224,0.15),0_1px_2px_rgba(0,0,0,0.2)]"
                        : "text-white/35 hover:text-white/55 hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className={`transition-colors ${isActive ? "text-white/70" : "text-white/25"}`}>
                      {tab.icon}
                    </span>
                    <span>{tab.name}</span>
                    <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded-md transition-colors ${
                      isActive ? "bg-white/10 text-white/60" : "text-white/20"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-shrink-0 relative">
            {searchOpen ? (
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                placeholder="Search..."
                className="w-44 h-10 px-3 text-xs rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:border-[#7aa8e0]/40 transition-all"
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                title="Search commands"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.06] hover:border-white/10 transition-all group"
              >
                <Search size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </button>
            )}
          </div>
        </div>


        <p className="text-xs text-white/30 mb-4">
          Showing <span className="text-white/60 font-medium">{filtered.length}</span> commands
          {activeTab !== "All" && <> in <span className="text-[#7aa8e0]/70">{activeTab}</span></>}
          {searchQuery && <> matching &ldquo;<span className="text-white/50">{searchQuery}</span>&rdquo;</>}
        </p>

        {displayed.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayed.map((cmd) => (
                <CommandCard key={`${cmd.cog}-${cmd.name}`} command={cmd} />
              ))}
            </div>

            {hasMore && (
              <div ref={observerRef} className="flex justify-center mt-10">
                <div className="w-5 h-5 border-2 border-[#7aa8e0]/20 border-t-[#7aa8e0] rounded-full animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-16 text-center">
            <p className="text-white/40 text-sm">No commands found.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveTab("All"); setSearchOpen(false); }}
              className="mt-4 px-5 py-2 text-xs rounded-full bg-white/5 border border-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
