const COMMANDS_DATA = {
  categories: {
    antinuke: {
      name: "Anti-Nuke",
      commands: [
        { name: "antinuke", description: "View or configure Anti-Nuke settings", usage: ",antinuke [subcommand]", aliases: [], permissions: ["Administrator"] },
        { name: "antinuke enable", description: "Enable the Anti-Nuke system", usage: ",antinuke enable", aliases: [], permissions: ["Administrator"] },
        { name: "antinuke disable", description: "Disable the Anti-Nuke system", usage: ",antinuke disable", aliases: [], permissions: ["Administrator"] },
        { name: "antinuke action", description: "Set the punishment action (ban/kick/removeRoles)", usage: ",antinuke action <ban|kick|removeRoles>", aliases: [], permissions: ["Administrator"] },
        { name: "antinuke threshold", description: "Set action thresholds for Anti-Nuke", usage: ",antinuke threshold <action> <limit>", aliases: [], permissions: ["Administrator"] },
        { name: "antinuke whitelist", description: "Toggle a member on the Anti-Nuke whitelist", usage: ",antinuke whitelist <@member>", aliases: [], permissions: ["Administrator"] },
        { name: "antinuke logchannel", description: "Set the Anti-Nuke log channel", usage: ",antinuke logchannel <#channel>", aliases: [], permissions: ["Administrator"] },
        { name: "antinuke admin", description: "Add or remove an antinuke admin (owner only)", usage: ",antinuke admin <@member>", aliases: [], permissions: ["Administrator"] },
      ],
      count: 8,
    },
  },
};

export async function GET() {
  return Response.json(COMMANDS_DATA);
}
