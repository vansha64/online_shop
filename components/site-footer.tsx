import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3 font-black">
            <span className="relative h-12 w-12 overflow-hidden rounded-xl border border-[#d6ad55]/45 bg-black shadow-lg shadow-black/40">
              <Image src="/bandit-logo.jpg" alt="BANDIT logo" fill sizes="48px" className="object-contain" />
            </span>
            <span className="tracking-[0.18em] text-[#d6ad55]">BANDIT</span>
          </div>
          <p className="max-w-md text-zinc-400">Premium T-Shirts for Everyday Movement. Built for clean daily outfits, custom needs, and community drops.</p>
          <div className="mt-5 flex gap-3 text-zinc-300">
            <MessageCircle />
            <Send />
            <Mail />
          </div>
        </div>
        <div className="grid gap-3 text-sm text-zinc-300">
          <strong className="text-white">Explore</strong>
          <Link href="/products">Products</Link>
          <Link href="/custom">Custom T-Shirt</Link>
          <Link href="/lookbook">Lookbook</Link>
          <Link href="/size-guide">Size Guide</Link>
        </div>
        <form className="grid gap-3">
          <strong>Newsletter</strong>
          <p className="text-sm text-zinc-400">Drop info, custom tips, and apparel notes.</p>
          <Input placeholder="Email kamu" type="email" />
          <Button type="button">Subscribe</Button>
        </form>
      </div>
    </footer>
  );
}
