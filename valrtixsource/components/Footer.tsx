import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/icon.png" alt="Valtrix" width={28} height={28} className="rounded-md" />
            <span className="font-semibold text-white">Valtrix</span>
          </div>
          <p className="text-sm text-muted-foreground">the all in one moderation bot for discord</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Product</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Resources</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/invite" className="hover:text-white transition-colors">Invite</Link></li>
            <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>

          </ul>
        </div>
        </div>
      <div className="max-w-5xl mx-auto mt-10 flex flex-col items-center gap-1 text-xs text-muted-foreground">
        <Link href="https://github.com/Batman76221" className="flex items-center gap-2 hover:text-white transition-colors">
          <Image src="https://avatars.githubusercontent.com/u/242625464?s=60&v=4" alt="Terrified" width={20} height={20} className="rounded-full" />
          Terrified <span className="opacity-60">(view developer)</span>
        </Link>
        <Link href="https://github.com/Batman76221/ValtrixPreview/" className="hover:text-white transition-colors">(view preview)</Link>
      </div>
    </footer>
  );
}
