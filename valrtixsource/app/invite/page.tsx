import { redirect } from "next/navigation";

export default function InvitePage() {
  redirect("https://discord.com/oauth2/authorize?client_id=1512224590078935252&permissions=8&integration_type=0&scope=bot");
}
