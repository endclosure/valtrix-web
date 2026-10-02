import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/SmoothScroll";
import { Stars } from "@/components/background/Stars";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  themeColor: "#4d8fd4",
};

export const metadata: Metadata = {
  title: "Valtrix",
  description:
    "The all-in-one solution for seamless server management — powerful, polished, and visually refined.",
  metadataBase: new URL("https://myproject-three-gilt.vercel.app"),
  openGraph: {
    title: "Valtrix",
    description:
      "The all-in-one solution for seamless server management — powerful, polished, and visually refined.",
    url: "https://myproject-three-gilt.vercel.app",
    siteName: "Valtrix",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "Valtrix" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Valtrix",
    description:
      "The all-in-one solution for seamless server management — powerful, polished, and visually refined.",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${poppins.variable} min-h-screen antialiased bg-black text-white`}>
        <Stars />
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
        <Toaster
          theme="dark"
          position="top-right"
          richColors
          toastOptions={{
            style: {
              background: "rgba(17, 17, 17, 0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
