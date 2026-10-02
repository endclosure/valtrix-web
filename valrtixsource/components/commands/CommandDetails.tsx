import { Command } from "@/types/commands";
import { CommandUsage } from "./CommandUsage";
import { CommandParameters } from "./CommandParameters";
import { CommandAliases } from "./CommandAliases";
import { MdShield } from "react-icons/md";

interface CommandDetailsProps {
  command: Command;
}

export function CommandDetails({ command }: CommandDetailsProps) {
  const validParameters =
    command.parameters?.filter(
      (param) => param.name.toLowerCase() !== "none"
    ) || [];

  return (
    <div className="px-4 pb-4 pt-3 border-t border-white/10 space-y-4 bg-white/[0.01]">
      {command.permissions && command.permissions.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7aa8e0]/90 mb-2 flex items-center gap-1.5">
            <MdShield className="w-3.5 h-3.5" /> Required Permissions
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {command.permissions.map((perm) => (
              <span
                key={perm}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20"
              >
                {perm}
              </span>
            ))}
          </div>
        </div>
      )}

      {command.usage && <CommandUsage command={command} />}

      {validParameters.length > 0 && (
        <CommandParameters
          parameters={command.parameters}
          commandName={command.name}
        />
      )}

      {command.aliases && command.aliases.length > 0 && (
        <CommandAliases aliases={command.aliases} />
      )}
    </div>
  );
}
