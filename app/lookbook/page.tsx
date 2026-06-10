import Image from "next/image";
import Link from "next/link";

const looks = [
  ["Casual", "Basic tee, denim, and sneakers.", "/products/basic-cotton-tee"],
  ["Streetwear", "Oversize tee with cargo pants.", "/products/oversize-heavyweight-tee"],
  ["Office casual", "Polo shirt with relaxed trousers.", "/products/polo-shirt"],
  ["Event", "Minimal logo tee for team days.", "/products/minimal-logo-tee"],
  ["Community", "Custom ready tee for group orders.", "/products/custom-ready-tee"],
  ["Couple outfit", "Matching cotton tees for two.", "/products/couple-tee"],
];

export default function LookbookPage() {
  return (
    <main className="section-shell">
      <p className="text-sm font-black uppercase text-[#d6ad55]">Lookbook</p>
      <h1 className="mb-8 text-5xl font-black sm:text-7xl">Outfit inspiration.</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {looks.map(([title, copy, href], index) => (
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06]" key={title}>
            <div className="relative aspect-[4/5]">
              <Image src={index % 2 ? "/lookbook-black-tee.png" : "/product-stack-tees.png"} alt={title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <strong className="text-xl">{title}</strong>
              <p className="mt-2 text-zinc-400">{copy}</p>
              <Link className="mt-4 inline-block font-bold text-[#d6ad55]" href={href}>Shop related product</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
