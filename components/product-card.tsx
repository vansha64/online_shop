"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import { useShopStore } from "@/store/use-shop-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

export function ProductCard({ product }: { product: Product }) {
  const [quick, setQuick] = useState(false);
  const addToCart = useShopStore((state) => state.addToCart);
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);
  const isWishlisted = useShopStore((state) => state.isWishlisted(product.id));
  const color = product.colors[0];
  const size = product.sizes[0];

  function addDefault() {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      selectedColor: color,
      selectedSize: size,
      price: product.price,
      quantity: 1,
    });
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20">
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>
        <button className="absolute right-3 top-3 rounded-full bg-black/50 p-2 backdrop-blur" onClick={() => toggleWishlist(product.id)} aria-label="Toggle wishlist">
          <Heart className={isWishlisted ? "fill-emerald-300 text-emerald-300" : ""} size={18} />
        </button>
        <button className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-zinc-950/80 px-4 py-3 text-sm font-bold opacity-0 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100" onClick={() => setQuick(true)}>
          <Eye size={16} /> Quick view
        </button>
      </div>
      <div className="grid gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`} className="font-black hover:text-emerald-300">
              {product.name}
            </Link>
            <p className="text-sm text-zinc-400">{product.category} · {product.material}</p>
          </div>
          <strong>{formatRupiah.format(product.price)}</strong>
        </div>
        <div className="flex items-center gap-1 text-sm text-zinc-300">
          <Star className="fill-lime-300 text-lime-300" size={15} /> {product.rating} ({product.reviewCount})
        </div>
        <div className="flex gap-2">
          {product.colors.slice(0, 5).map((item) => (
            <span className="h-5 w-5 rounded-full border border-white/30 bg-zinc-500" title={item} key={item} />
          ))}
        </div>
        <Button onClick={addDefault} className="gap-2">
          <ShoppingBag size={17} /> Add to cart
        </Button>
      </div>
      <QuickView product={product} open={quick} onOpenChange={setQuick} />
    </article>
  );
}

function QuickView({ product, open, onOpenChange }: { product: Product; open: boolean; onOpenChange: (open: boolean) => void }) {
  const addToCart = useShopStore((state) => state.addToCart);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-96 bg-zinc-900">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>
        <div className="grid gap-5 p-6">
          <div>
            <p className="text-sm font-black uppercase text-emerald-300">{product.category}</p>
            <h2 className="text-4xl font-black">{product.name}</h2>
            <p className="mt-3 text-zinc-400">{product.description}</p>
          </div>
          <strong className="text-2xl">{formatRupiah.format(product.price)}</strong>
          <div className="grid gap-2">
            <span className="font-bold">Color</span>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((item) => (
                <button className={`rounded-full border px-4 py-2 text-sm ${color === item ? "border-emerald-300 bg-emerald-300 text-zinc-950" : "border-white/10 bg-white/5"}`} key={item} onClick={() => setColor(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <span className="font-bold">Size</span>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button className={`rounded-full border px-4 py-2 text-sm ${size === item ? "border-emerald-300 bg-emerald-300 text-zinc-950" : "border-white/10 bg-white/5"}`} key={item} onClick={() => setSize(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <Button
            onClick={() => {
              addToCart({ productId: product.id, name: product.name, slug: product.slug, image: product.images[0], selectedColor: color, selectedSize: size, price: product.price, quantity: 1 });
              onOpenChange(false);
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
