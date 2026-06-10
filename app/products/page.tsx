"use client";

import { useMemo, useState } from "react";
import { allColors, allSizes, categories, products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { Input, Select } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState("all");
  const [color, setColor] = useState("all");
  const [sort, setSort] = useState("newest");
  const [maxPrice, setMaxPrice] = useState(300000);

  const filtered = useMemo(() => {
    return products
      .filter((product) => {
        const keyword = `${product.name} ${product.description} ${product.category}`.toLowerCase();
        return (
          (!query || keyword.includes(query.toLowerCase())) &&
          (category === "all" || product.category === category) &&
          (size === "all" || product.sizes.includes(size)) &&
          (color === "all" || product.colors.includes(color)) &&
          product.price <= maxPrice
        );
      })
      .sort((a, b) => {
        if (sort === "lowest") return a.price - b.price;
        if (sort === "highest") return b.price - a.price;
        if (sort === "best") return b.reviewCount - a.reviewCount;
        return b.id.localeCompare(a.id);
      });
  }, [query, category, size, color, maxPrice, sort]);

  return (
    <main className="section-shell">
      <div className="mb-8">
        <p className="text-sm font-black uppercase text-[#d6ad55]">Product catalog</p>
        <h1 className="text-5xl font-black sm:text-7xl">Find your next daily tee.</h1>
      </div>
      <div className="mb-8 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.06] p-4 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <Input placeholder="Search product..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </Select>
        <Select value={size} onChange={(event) => setSize(event.target.value)}>
          <option value="all">All sizes</option>
          {allSizes.map((item) => <option key={item}>{item}</option>)}
        </Select>
        <Select value={color} onChange={(event) => setColor(event.target.value)}>
          <option value="all">All colors</option>
          {allColors.map((item) => <option key={item}>{item}</option>)}
        </Select>
        <Select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="newest">Newest</option>
          <option value="lowest">Lowest price</option>
          <option value="highest">Highest price</option>
          <option value="best">Best seller</option>
        </Select>
        <label className="grid gap-2 text-sm text-zinc-400 lg:col-span-5">
          Max price: Rp{maxPrice.toLocaleString("id-ID")}
          <input type="range" min={90000} max={300000} step={10000} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
        </label>
      </div>
      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-10 text-center">
          <h2 className="text-3xl font-black">No product matches.</h2>
          <p className="mt-2 text-zinc-400">Try changing your filter.</p>
          <Button className="mt-5" onClick={() => { setQuery(""); setCategory("all"); setSize("all"); setColor("all"); setMaxPrice(300000); }}>Reset filters</Button>
        </div>
      )}
    </main>
  );
}
