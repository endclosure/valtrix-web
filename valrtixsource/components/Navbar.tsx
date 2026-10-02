"use client";

import { useRouter, usePathname } from "next/navigation";
import { IoTerminal } from "react-icons/io5";
import { SiDiscord } from "react-icons/si";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="relative z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-2xl mx-auto mt-5 h-13 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg shadow-black/40 items-center px-4 gap-2">
  
        <button onClick={() => router.push("/")} className="cursor-pointer shrink-0" aria-label="Home">
          <img
            src="/icon.png"
            alt="Valtrix"
            width={30}
            height={30}
            className="rounded-lg transition-transform duration-300 hover:scale-110"
          />
        </button>

        <div className="h-5 w-px bg-white/15 mx-1" />

   
        <div className="flex items-center gap-1 flex-1">
          <button
            onClick={() => router.push("/")}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl transition-all duration-200 ${
              pathname === "/"
                ? "bg-white/10 text-white"
                : "text-white/55 hover:text-white hover:bg-white/7"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => router.push("/commands")}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl transition-all duration-200 ${
              pathname === "/commands"
                ? "bg-white/10 text-white"
                : "text-white/55 hover:text-white hover:bg-white/7"
            }`}
          >
            <IoTerminal size={13} /> Commands
          </button>
        </div>


        <button
          onClick={() => router.push("/invite")}
          className="flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-xl bg-[#7aa8e0]/15 border border-[#7aa8e0]/25 text-[#7aa8e0] hover:bg-[#7aa8e0]/25 transition-all duration-200 shrink-0"
        >
          <SiDiscord size={13} /> Invite
        </button>
      </nav>
    </div>
  );
}
