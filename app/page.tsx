import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageCheck, Palette, RefreshCcw, Shirt, Sparkles, Truck } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/form";

const bestSellers = products.filter((product) => product.badges.includes("Best Seller")).slice(0, 4);
const newArrivals = products.filter((product) => product.badges.includes("New")).slice(0, 4);

export default function HomePage() {
  return (
    <main>
      <section className="section-shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="fade-up">
          <div className="mb-5 flex items-center gap-4">
            <span className="relative h-16 w-16 overflow-hidden rounded-xl border border-[#d6ad55]/45 bg-black shadow-xl shadow-black/50">
              <Image src="/bandit-logo.jpg" alt="BANDIT logo" fill priority sizes="64px" className="object-contain" />
            </span>
            <div>
              <p className="text-xs font-black uppercase text-[#d6ad55]">Premium T-Shirts for Everyday Movement</p>
              <strong className="block text-2xl tracking-[0.2em] text-[#d6ad55]">BANDIT</strong>
            </div>
          </div>
          <h1 className="text-5xl font-black leading-[0.95] sm:text-7xl lg:text-8xl">BANDIT black gold essentials.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">BANDIT menghadirkan kaos premium, oversize staples, hoodie essentials, dan custom tee untuk brand, komunitas, dan daily outfit.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#b98a2f] px-5 font-bold text-zinc-950 transition hover:bg-[#d6ad55]">
              Shop collection <ArrowRight size={18} />
            </Link>
            <Link className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 px-5 font-bold hover:bg-white/10" href="/custom">Create custom tee</Link>
          </div>
        </div>
        <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30">
          <Image src="/product-stack-tees.png" alt="BANDIT apparel hero" fill priority className="object-contain" />
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-black/60 p-5 backdrop-blur">
            <p className="text-sm text-zinc-400">Current drop</p>
            <strong className="text-2xl">Core Movement Series</strong>
          </div>
        </div>
      </section>

      <section className="grid border-y border-white/10 bg-white/[0.04] text-center text-sm font-bold text-zinc-300 sm:grid-cols-4">
        {["Free shipping over Rp250.000", "Custom design available", "Premium cotton", "Fast processing"].map((item) => (
          <div className="border-white/10 px-4 py-5 sm:border-r" key={item}>{item}</div>
        ))}
      </section>

      <section className="section-shell">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-[#d6ad55]">Categories</p>
            <h2 className="text-4xl font-black sm:text-6xl">Shop by style.</h2>
          </div>
          <Link className="hidden font-bold text-[#d6ad55] sm:block" href="/products">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Link className="group rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:bg-white/[0.09]" href={`/products?category=${encodeURIComponent(category)}`} key={category}>
              {[Shirt, Sparkles, PackageCheck, Truck, Palette].map((Icon, iconIndex) => iconIndex === index && <Icon className="mb-10 text-[#d6ad55]" key={category} />)}
              <strong>{category}</strong>
              <p className="mt-2 text-sm text-zinc-400">Explore {category.toLowerCase()} collection</p>
            </Link>
          ))}
        </div>
      </section>

      <ProductSection title="Best sellers" subtitle="Produk yang paling sering masuk keranjang." products={bestSellers} />
      <ProductSection title="New arrivals" subtitle="Drop terbaru untuk rotasi outfit kamu." products={newArrivals} />

      <section className="section-shell">
        <Card className="grid overflow-hidden lg:grid-cols-2">
          <div className="relative min-h-96">
            <Image src="/fabric-detail.png" alt="Custom tee detail" fill className="object-contain" />
          </div>
          <CardContent className="grid content-center gap-5 p-8">
            <p className="text-sm font-black uppercase text-[#d6ad55]">Custom studio</p>
            <h2 className="text-4xl font-black sm:text-6xl">Buat kaos custom tanpa backend rumit.</h2>
            <p className="text-zinc-400">Upload desain, pilih posisi print, tambah teks, dan kirim brief langsung lewat WhatsApp.</p>
            <Link href="/custom" className="inline-flex h-12 w-fit items-center rounded-full bg-[#b98a2f] px-6 font-black text-zinc-950">Start custom order</Link>
          </CardContent>
        </Card>
      </section>

      <section className="section-shell grid gap-4 md:grid-cols-3">
        {[
          [Truck, "Fast processing", "Pesanan reguler diproses 1-2 hari kerja."],
          [RefreshCcw, "Easy size exchange", "Tukar ukuran 1x selama stok tersedia."],
          [PackageCheck, "Quality checked", "Produk dicek sebelum dikirim."],
        ].map(([Icon, title, copy]) => (
          <Card key={String(title)}>
            <CardContent className="p-6">
              <Icon className="mb-10 text-[#d6ad55]" />
              <strong className="text-xl">{String(title)}</strong>
              <p className="mt-3 text-zinc-400">{String(copy)}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-3">
          {["Bahannya adem, cutting oversized-nya bagus.", "Custom tee untuk komunitas kami hasilnya clean.", "Checkout via WhatsApp praktis dan cepat."].map((text, index) => (
            <blockquote className="rounded-3xl border border-white/10 bg-white/[0.06] p-6" key={text}>
              <p className="text-zinc-300">{text}</p>
              <cite className="mt-6 block not-italic text-[#d6ad55]">Customer #{index + 1}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center">
          <h2 className="text-4xl font-black">Join the next drop.</h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">Dapatkan info koleksi baru, promo custom, dan apparel notes.</p>
          <div className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
            <Input placeholder="Email kamu" type="email" />
            <Button type="button">Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductSection({ title, subtitle, products }: { title: string; subtitle: string; products: typeof bestSellers }) {
  return (
    <section className="section-shell">
      <div className="mb-8">
        <p className="text-sm font-black uppercase text-[#d6ad55]">{subtitle}</p>
        <h2 className="text-4xl font-black sm:text-6xl">{title}</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard product={product} key={product.id} />)}
      </div>
    </section>
  );
}
