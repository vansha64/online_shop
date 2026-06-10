"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/form";
import { formatRupiah, whatsappNumber } from "@/lib/utils";
import { useShopStore } from "@/store/use-shop-store";

export default function CheckoutPage() {
  const cart = useShopStore((state) => state.cart);
  const clearCart = useShopStore((state) => state.clearCart);
  const [success, setSuccess] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 250000 || subtotal === 0 ? 0 : 18000;
  const total = subtotal + shipping;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const required = ["name", "phone", "address", "city", "courier"];
    if (required.some((key) => !String(form.get(key) ?? "").trim())) return alert("Lengkapi semua field wajib.");

    const items = cart.map((item, index) => `${index + 1}. ${item.name} - ${item.selectedColor} - ${item.selectedSize} - ${item.quantity} - ${formatRupiah.format(item.price * item.quantity)}`);
    const message = [
      "Halo BANDIT, saya ingin order:",
      ...items,
      `Subtotal: ${formatRupiah.format(subtotal)}`,
      `Shipping: ${formatRupiah.format(shipping)}`,
      `Total: ${formatRupiah.format(total)}`,
      `Nama: ${form.get("name")}`,
      `No WhatsApp: ${form.get("phone")}`,
      `Alamat: ${form.get("address")}, ${form.get("city")}`,
      `Kurir: ${form.get("courier")}`,
      `Catatan: ${form.get("note") || "-"}`,
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    setSuccess(true);
    clearCart();
  }

  return (
    <main className="section-shell">
      <h1 className="mb-8 text-5xl font-black">Checkout</h1>
      {success && <div className="mb-5 rounded-2xl bg-[#b98a2f] p-4 font-bold text-zinc-950">Order message opened in WhatsApp.</div>}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5" onSubmit={submit}>
          <Input name="name" placeholder="Full name *" />
          <Input name="phone" placeholder="WhatsApp number *" />
          <Textarea name="address" placeholder="Address *" />
          <Input name="city" placeholder="City *" />
          <Select name="courier" defaultValue="">
            <option value="" disabled>Courier option *</option>
            <option>JNE Regular</option>
            <option>J&T Express</option>
            <option>SiCepat</option>
            <option>Grab / Gojek Instant</option>
          </Select>
          <Textarea name="note" placeholder="Note" />
          <Button disabled={!cart.length}>Open WhatsApp checkout</Button>
        </form>
        <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Order summary</h2>
          <div className="my-5 grid gap-3 text-sm text-zinc-300">
            {cart.map((item) => <div className="flex justify-between gap-4" key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}><span>{item.name} x{item.quantity}</span><b>{formatRupiah.format(item.price * item.quantity)}</b></div>)}
          </div>
          <div className="grid gap-2 border-t border-white/10 pt-4">
            <div className="flex justify-between"><span>Subtotal</span><b>{formatRupiah.format(subtotal)}</b></div>
            <div className="flex justify-between"><span>Shipping</span><b>{formatRupiah.format(shipping)}</b></div>
            <div className="flex justify-between text-xl"><span>Total</span><b>{formatRupiah.format(total)}</b></div>
          </div>
        </aside>
      </div>
    </main>
  );
}
