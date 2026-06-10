"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { Heart, MessageCircle, Minus, Plus, Star } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { formatRupiah, whatsappNumber } from "@/lib/utils";
import { useShopStore } from "@/store/use-shop-store";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const productMaybe = getProductBySlug(slug);
  const [image, setImage] = useState(productMaybe?.images[0] ?? "");
  const [color, setColor] = useState(productMaybe?.colors[0] ?? "");
  const [size, setSize] = useState(productMaybe?.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [sizeOpen, setSizeOpen] = useState(false);
  const addToCart = useShopStore((state) => state.addToCart);
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);

  if (!productMaybe) {
    return (
      <main className="section-shell">
        <h1 className="text-5xl font-black">Product not found.</h1>
        <Link className="mt-6 inline-flex font-bold text-[#d6ad55]" href="/products">Back to products</Link>
      </main>
    );
  }

  const product = productMaybe;

  function add() {
    addToCart({ productId: product.id, name: product.name, slug: product.slug, image: product.images[0], selectedColor: color, selectedSize: size, price: product.price, quantity });
  }

  const waText = encodeURIComponent(`Halo BANDIT, saya ingin order ${product.name} - ${color} - ${size} - Qty ${quantity}`);

  return (
    <main className="section-shell">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900">
            <Image src={image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((item) => (
              <button className="relative aspect-square overflow-hidden rounded-2xl border border-white/10" key={item} onClick={() => setImage(item)}>
                <Image src={item} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <section className="grid content-start gap-6">
          <div>
            <p className="text-sm font-black uppercase text-[#d6ad55]">{product.category}</p>
            <h1 className="text-5xl font-black sm:text-7xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2 text-zinc-300">
              <Star className="fill-[#d6ad55] text-[#d6ad55]" /> {product.rating} · {product.reviewCount} reviews
            </div>
          </div>
          <strong className="text-3xl">{formatRupiah.format(product.price)}</strong>
          <p className="text-lg leading-8 text-zinc-400">{product.description}</p>
          <Option title="Color" items={product.colors} value={color} onChange={setColor} />
          <Option title="Size" items={product.sizes} value={size} onChange={setSize} />
          <button className="w-fit font-bold text-[#d6ad55]" onClick={() => setSizeOpen(true)}>Open size chart</button>
          <div className="flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 p-2">
            <button className="rounded-full p-2 hover:bg-white/10" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
            <strong>{quantity}</strong>
            <button className="rounded-full p-2 hover:bg-white/10" onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button onClick={add}>Add to cart</Button>
            <Button variant="outline" onClick={() => toggleWishlist(product.id)}><Heart size={18} /> Wishlist</Button>
            <a className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#b98a2f] px-5 font-black text-zinc-950 sm:col-span-2" href={`https://wa.me/${whatsappNumber}?text=${waText}`} target="_blank"><MessageCircle size={18} /> Buy via WhatsApp</a>
          </div>
          <div className="grid gap-2 rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-zinc-300">
            <p><b>Material:</b> {product.material}</p>
            <p><b>GSM:</b> {product.gsm}</p>
            <p><b>Fit:</b> {product.fit}</p>
            <p><b>Shipping:</b> Diproses 1-2 hari kerja setelah pembayaran.</p>
          </div>
        </section>
      </div>
      <section className="mt-16">
        <h2 className="mb-6 text-4xl font-black">Related products</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4).map((item) => (
            <Link className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 font-bold hover:bg-white/10" href={`/products/${item.slug}`} key={item.id}>{item.name}</Link>
          ))}
        </div>
      </section>
      <div className="fixed inset-x-3 bottom-3 z-30 rounded-3xl border border-white/10 bg-zinc-950/90 p-3 backdrop-blur md:hidden">
        <Button className="w-full" onClick={add}>Add {product.name}</Button>
      </div>
      <Dialog open={sizeOpen} onOpenChange={setSizeOpen}>
        <div className="p-6">
          <h2 className="mb-4 text-3xl font-black">Size chart</h2>
          <div className="grid gap-2">
            {["S 48/68", "M 51/70", "L 54/73", "XL 57/76", "XXL 60/78"].map((row) => <div className="rounded-2xl bg-white/5 p-4" key={row}>{row}</div>)}
          </div>
        </div>
      </Dialog>
    </main>
  );
}

function Option({ title, items, value, onChange }: { title: string; items: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="grid gap-2">
      <strong>{title}</strong>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button className={`rounded-full border px-4 py-2 text-sm font-bold ${value === item ? "border-[#d6ad55] bg-[#b98a2f] text-zinc-950" : "border-white/10 bg-white/5"}`} key={item} onClick={() => onChange(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
