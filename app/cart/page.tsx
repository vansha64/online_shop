"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cartKey, useShopStore } from "@/store/use-shop-store";
import { formatRupiah } from "@/lib/utils";

export default function CartPage() {
  const cart = useShopStore((state) => state.cart);
  const updateQuantity = useShopStore((state) => state.updateQuantity);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 250000 || subtotal === 0 ? 0 : 18000;

  if (!cart.length) {
    return (
      <main className="section-shell text-center">
        <h1 className="text-5xl font-black">Cart is empty.</h1>
        <p className="mt-3 text-zinc-400">Mulai pilih produk favorit kamu.</p>
        <Link className="mt-6 inline-flex h-11 items-center rounded-full bg-emerald-300 px-5 font-black text-zinc-950" href="/products">Continue shopping</Link>
      </main>
    );
  }

  return (
    <main className="section-shell">
      <h1 className="mb-8 text-5xl font-black">Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4">
          {cart.map((item) => {
            const key = cartKey(item);
            return (
              <article className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4 sm:grid-cols-[120px_1fr_auto]" key={key}>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-900">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <Link className="font-black hover:text-emerald-300" href={`/products/${item.slug}`}>{item.name}</Link>
                  <p className="text-sm text-zinc-400">{item.selectedColor} · {item.selectedSize}</p>
                  <div className="mt-4 flex w-fit items-center gap-2 rounded-full border border-white/10 p-1">
                    <button className="p-2" onClick={() => updateQuantity(key, item.quantity - 1)}><Minus size={16} /></button>
                    <b>{item.quantity}</b>
                    <button className="p-2" onClick={() => updateQuantity(key, item.quantity + 1)}><Plus size={16} /></button>
                  </div>
                </div>
                <div className="grid justify-items-end gap-4">
                  <strong>{formatRupiah.format(item.price * item.quantity)}</strong>
                  <button onClick={() => removeFromCart(key)} aria-label="Remove item"><Trash2 size={18} /></button>
                </div>
              </article>
            );
          })}
        </div>
        <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Summary</h2>
          <div className="my-5 grid gap-3 text-zinc-300">
            <div className="flex justify-between"><span>Subtotal</span><b>{formatRupiah.format(subtotal)}</b></div>
            <div className="flex justify-between"><span>Shipping</span><b>{formatRupiah.format(shipping)}</b></div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-white"><span>Total</span><b>{formatRupiah.format(subtotal + shipping)}</b></div>
          </div>
          <div className="grid gap-3">
            <Link className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 font-bold" href="/products">Continue shopping</Link>
            <Link className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-300 font-black text-zinc-950" href="/checkout">Checkout</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
