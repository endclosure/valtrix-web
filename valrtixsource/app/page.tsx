import Link from "next/link";
import { SiDiscord } from "react-icons/si";
import { IoTerminal } from "react-icons/io5";

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full mx-auto text-center space-y-8">
        <div className="space-y-5">
          <div className="flex justify-center mb-2">
            <img
              src="/icon.png"
              alt="Valtrix"
              width={112}
              height={112}
              className="rounded-2xl shadow-xl shadow-black/40 border border-white/10"
            />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-[4.5rem] font-bold tracking-tight leading-[1.1] text-gradient mx-auto">
            Valtrix
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            A simple but good discord bot.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <Link
            href="/invite"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-white/12 text-white border border-white/20 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm shadow-lg shadow-black/20"
          >
            <SiDiscord size={15} />
            Invite Bot
          </Link>
          <Link
            href="/commands"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-white/6 text-white/75 border border-white/10 hover:bg-white/12 hover:text-white transition-all duration-200 backdrop-blur-sm"
          >
            <IoTerminal size={15} />
            View Commands
          </Link>
        </div>
      </div>
    </main>
  );
}
