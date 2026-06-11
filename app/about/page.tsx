export default function AboutPage() {
  return (
    <main className="section-shell">
      <p className="text-sm font-black uppercase text-[#d6ad55]">About BANDITT</p>
      <h1 className="max-w-4xl text-5xl font-black sm:text-7xl">Premium blank apparel for daily movement and custom identity.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {[
          ["Brand story", "BANDITT dibuat sebagai demo toko apparel modern yang terasa siap jual, dengan fokus pada t-shirt premium dan custom order."],
          ["Mission", "Membantu brand, komunitas, dan pembeli harian mendapatkan apparel clean dengan proses order yang sederhana."],
          ["Material quality", "Dummy data menampilkan cotton combed, heavy cotton, pique cotton, dan fleece sebagai simulasi katalog."],
          ["Production process", "Alur produksi disimulasikan dari pemilihan produk, custom brief, quality check, hingga pengiriman."],
        ].map(([title, copy]) => <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-6" key={title}><h2 className="text-2xl font-black">{title}</h2><p className="mt-3 text-zinc-400">{copy}</p></section>)}
      </div>
    </main>
  );
}
