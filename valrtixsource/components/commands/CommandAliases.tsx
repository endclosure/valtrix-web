interface CommandAliasesProps {
  aliases: string[];
}

export function CommandAliases({ aliases }: CommandAliasesProps) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7aa8e0]/90 mb-2">
        Aliases
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {aliases.map((alias) => (
          <span
            key={alias}
            className="px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-[#7aa8e0]/10 text-[#7aa8e0] border border-[#7aa8e0]/20 truncate"
          >
            ,{alias}
          </span>
        ))}
      </div>
    </div>
  );
}
