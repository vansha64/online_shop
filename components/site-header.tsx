"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useShopStore } from "@/store/use-shop-store";

const nav = [
  ["/products", "Products"],
  ["/custom", "Custom"],
  ["/lookbook", "Lookbook"],
  ["/size-guide", "Size Guide"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const cartCount = useShopStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistCount = useShopStore((state) => state.wishlist.length);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-black">
          <span className="relative h-12 w-12 overflow-hidden rounded-xl border border-[#d6ad55]/45 bg-black shadow-lg shadow-black/40">
            <Image src="/bandit-logo.jpg" alt="BANDIT logo" fill sizes="48px" className="object-contain" />
          </span>
          <span className="text-lg tracking-[0.18em] text-[#d6ad55]">BANDIT</span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {nav.map(([href, label]) => (
            <Link className="rounded-full px-4 py-2 text-sm font-bold text-zinc-300 transition hover:bg-white/10 hover:text-white" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden rounded-full p-3 transition hover:bg-white/10 sm:inline-flex" href="/products" aria-label="Search">
            <Search size={20} />
          </Link>
          <Link className="relative rounded-full p-3 transition hover:bg-white/10" href="/products?wishlist=1" aria-label="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#d6ad55] text-xs font-black text-zinc-950">{wishlistCount}</span>}
          </Link>
          <Link className="relative rounded-full p-3 transition hover:bg-white/10" href="/cart" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#b98a2f] text-xs font-black text-zinc-950">{cartCount}</span>}
          </Link>
          <button className="rounded-full p-3 md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md md:hidden">
          <div className="ml-auto min-h-screen w-80 max-w-[86vw] border-l border-white/10 bg-zinc-950 p-5">
            <div className="mb-8 flex items-center justify-between">
              <strong>Menu</strong>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X />
              </button>
            </div>
            <div className="grid gap-2">
              {nav.map(([href, label]) => (
                <Link className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-bold" href={href} key={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
