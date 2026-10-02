import { CommandParameter } from "@/types/commands";
import { cn } from "@/lib/utils";

interface CommandParametersProps {
  parameters: CommandParameter[];
  commandName: string;
}

export function CommandParameters({
  parameters,
  commandName,
}: CommandParametersProps) {
  const validParameters = parameters.filter(
    (param) => param.name.toLowerCase() !== "none"
  );

  if (validParameters.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7aa8e0]/90 mb-2.5">
        Parameters
      </h4>
      <div className="space-y-1.5">
        {validParameters.map((param, index) => (
          <div
            key={`${commandName}-${param.name}-${index}`}
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-black/30 border border-white/5"
          >
            <code className="text-xs sm:text-sm font-mono text-white/90">
              {param.name}
            </code>
            <span
              className={cn(
                "text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0",
                param.required
                  ? "bg-[#7aa8e0]/15 text-[#7aa8e0] border border-[#7aa8e0]/30"
                  : "bg-white/5 text-white/50 border border-white/10"
              )}
            >
              {param.required ? "Required" : "Optional"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
