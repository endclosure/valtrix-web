import { Command, CommandParameter } from "@/types/commands";

/** Parse usage string like "anime <query>" or "avatar [member]" into parameters */
function parseUsageToParameters(usage: string): CommandParameter[] {
  const params: CommandParameter[] = [];
  const requiredRegex = /<([^>]+)>/g;
  const optionalRegex = /\[([^\]]+)\]/g;
  let m;
  while ((m = requiredRegex.exec(usage)) !== null) {
    params.push({ name: m[1].trim(), required: true });
  }
  while ((m = optionalRegex.exec(usage)) !== null) {
    params.push({ name: m[1].trim(), required: false });
  }
  return params;
}

export interface ApiCommand {
  name: string;
  description: string;
  usage: string;
  aliases: string[];
  permissions: string[];
}

export interface ApiCategory {
  name: string;
  commands: ApiCommand[];
  count: number;
}

export interface CommandsApiResponse {
  categories: Record<string, ApiCategory>;
}

export function transformApiCommandsToCommands(
  data: CommandsApiResponse
): Command[] {
  const commands: Command[] = [];
  for (const [key, category] of Object.entries(data.categories || {})) {
    const cogName = (category.name || key).trim();
    for (const cmd of category.commands || []) {
      commands.push({
        name: cmd.name,
        description: cmd.description || "No description.",
        usage: cmd.usage || "",
        aliases: cmd.aliases || [],
        permissions: cmd.permissions || [],
        parameters: parseUsageToParameters(cmd.usage || ""),
        cog: cogName,
        donor: false,
      });
    }
  }
  return commands.sort((a, b) => a.name.localeCompare(b.name));
}
