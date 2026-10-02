export interface CommandParameter {
  name: string;
  required: boolean;
}

export interface Command {
  name: string;
  description: string;
  aliases: string[];
  usage: string;
  parameters: CommandParameter[];
  cog: string;
  permissions: string[];
  donor: boolean;
}

export type CommandCategory =
  | "All"
  | "Extra"
  | "Fun"
  | "Configuration"
  | "Utility"
  | "Security"
  | "Social"
  | "Miscellaneous";

export type CategoryMetadata = {
  name: string;
  icon: React.ReactNode;
  commandCount?: number;
};
