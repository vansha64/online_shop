"use client";

import { useMemo, useState } from "react";

const whatsappNumber = "6281234567890";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const products = [
  {
    id: "core-graphite",
    name: "Core Graphite",
    price: 129000,
    fit: "Regular",
    category: "regular",
    badge: "Daily Core",
    stock: 24,
    image: "/fabric-detail.png",
    position: "50% 48%",
    desc: "Cotton combed 24s dengan handfeel lembut, rib leher padat, dan siluet clean.",
    material: "Cotton combed 24s",
    weight: "Medium weight",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Graphite", "Cloud", "Sage"],
  },
  {
    id: "mint-boxy",
    name: "Mint Boxy",
    price: 149000,
    fit: "Oversized",
    category: "oversized",
    badge: "Best Seller",
    stock: 18,
    image: "/lookbook-black-tee.png",
    position: "28% 66%",
    desc: "Boxy tee berwarna sage muted dengan bahu jatuh natural dan look streetwear tenang.",
    material: "Cotton combed premium",
    weight: "Relaxed medium",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Sage", "Steel Blue", "Black"],
  },
  {
    id: "night-runner",
    name: "Night Runner",
    price: 169000,
    fit: "Heavyweight",
    category: "limited",
    badge: "Limited",
    stock: 9,
    image: "/product-stack-tees.png",
    position: "60% 44%",
    desc: "Kaos hitam lebih tebal untuk tampilan minimal yang kuat dan mudah dilayer.",
    material: "Heavy cotton",
    weight: "Heavyweight",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Graphite"],
  },
  {
    id: "cloud-white",
    name: "Cloud White",
    price: 119000,
    fit: "Regular",
    category: "regular",
    badge: "Airy Cotton",
    stock: 32,
    image: "/fabric-detail.png",
    position: "58% 48%",
    desc: "Off-white hangat untuk daily rotation, cocok dengan denim, cargo, atau outer ringan.",
    material: "Cotton combed 24s",
    weight: "Light-medium",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cloud", "Smoke", "Warm Clay"],
  },
  {
    id: "steel-blue",
    name: "Steel Blue",
    price: 139000,
    fit: "Regular",
    category: "regular",
    badge: "New Color",
    stock: 15,
    image: "/lookbook-black-tee.png",
    position: "76% 72%",
    desc: "Biru baja yang kalem, cukup beda untuk tampil standout tanpa terasa ramai.",
    material: "Cotton combed premium",
    weight: "Medium weight",
    sizes: ["M", "L", "XL"],
    colors: ["Steel Blue", "Graphite", "Cloud"],
  },
  {
    id: "studio-pack",
    name: "Studio Pack",
    price: 359000,
    fit: "Bundle",
    category: "limited",
    badge: "3 Tees Pack",
    stock: 11,
    image: "/lookbook-black-tee.png",
    position: "50% 52%",
    desc: "Paket tiga warna core untuk satu minggu outfit yang rapi dan mudah dipadukan.",
    material: "Mixed core cotton",
    weight: "Daily rotation",
    sizes: ["M", "L", "XL"],
    colors: ["Core Mix", "Dark Mix"],
  },
];

const colorMap = {
  Black: "#0c0d0c",
  Cloud: "#ece5d4",
  Graphite: "#2c302d",
  Sage: "#b9c9b8",
  "Steel Blue": "#647d9a",
  Smoke: "#d7d2c4",
  "Warm Clay": "#a96547",
  "Core Mix": "#9be7c7",
  "Dark Mix": "#191d1a",
};

const reviews = [
  ["Raka", "Bandung", "Cutting oversized-nya jatuh pas, bahannya adem, dan warna hitamnya pekat."],
  ["Dinda", "Jakarta", "Sage-nya kalem banget. Dipakai sama denim atau cargo tetap masuk."],
  ["Fajar", "Bekasi", "Order via WhatsApp cepat, detail pesanan sudah rapi, tinggal konfirmasi ongkir."],
];

const faqs = [
  ["Apakah bahan menerawang?", "Untuk warna terang tetap kami buat cukup padat untuk pemakaian harian. Disarankan memakai inner warna netral jika ingin lebih aman."],
  ["Bisa tukar ukuran?", "Bisa 1x selama stok tersedia, label belum dilepas, dan produk belum dipakai aktivitas luar."],
  ["Berapa lama pengiriman?", "Pesanan diproses 1-2 hari kerja setelah pembayaran. Estimasi pengiriman mengikuti kota tujuan."],
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [fit, setFit] = useState({ height: 170, weight: 65 });
  const [bundle, setBundle] = useState(["core-graphite", "mint-boxy", "cloud-white"]);

  const visibleProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesFilter = filter === "all" || product.category === filter;
      const haystack = `${product.name} ${product.fit} ${product.desc} ${product.colors.join(" ")}`.toLowerCase();
      return matchesFilter && (!keyword || haystack.includes(keyword));
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "stock") return a.stock - b.stock;
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [filter, query, sort]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const bundleProducts = products.filter((product) => bundle.includes(product.id));
  const bundleNormal = bundleProducts.reduce((sum, product) => sum + product.price, 0);
  const bundleTotal = Math.max(bundleNormal - 39000, 0);

  function addToCart(product, formOrSelection) {
    const size = formOrSelection.get ? formOrSelection.get("size") : formOrSelection.size;
    const color = formOrSelection.get ? formOrSelection.get("color") : formOrSelection.color;
    const key = `${product.id}-${size}-${color}`;

    setCart((items) => {
      const current = items.find((item) => item.key === key);
      if (current) {
        return items.map((item) => (item.key === key ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...items, { key, name: product.name, price: product.price, size, color, qty: 1 }];
    });

    setDrawerOpen(true);
    setQuickView(null);
  }

  function toggleBundle(id) {
    setBundle((items) => {
      if (items.includes(id)) return items.filter((item) => item !== id);
      if (items.length >= 3) return [items[1], items[2], id];
      return [...items, id];
    });
  }

  function addBundleToCart() {
    bundleProducts.forEach((product) => addToCart(product, { size: "L", color: product.colors[0] }));
  }

  function updateQty(key, change) {
    setCart((items) =>
      items
        .map((item) => (item.key === key ? { ...item, qty: item.qty + change } : item))
        .filter((item) => item.qty > 0),
    );
  }

  function recommendation() {
    const bmi = fit.weight / Math.pow(fit.height / 100, 2);
    if (fit.height >= 181 || bmi > 27) return "XL regular / XXL oversized";
    if (fit.height >= 171 || bmi > 23) return "L regular / XL oversized";
    if (fit.height < 160 && bmi < 21) return "S regular / M oversized";
    return "M regular / L oversized";
  }

  function checkout() {
    if (!cart.length) return;
    const lines = cart.map(
      (item, index) =>
        `${index + 1}. ${item.name} - ${item.size} - ${item.color} - ${item.qty} pcs - ${rupiah.format(
          item.price * item.qty,
        )}`,
    );
    const message = [
      "Halo Oblong Lab, saya mau order:",
      "",
      ...lines,
      "",
      `Total: ${rupiah.format(totalPrice)}`,
      "",
      "Mohon info stok, ongkir, dan metode pembayarannya.",
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }

  return (
    <>
      <div className="noise" />
      <div className="announcement">
        <span>Core Series 01 now live</span>
        <strong>Gratis tukar ukuran 1x untuk pembelian minggu ini</strong>
        <span>Order cut-off 16.00 WIB</span>
      </div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Oblong Lab home">
          <span>OL</span>
          <strong>Oblong Lab</strong>
        </a>
        <nav className="nav-links" aria-label="Navigasi utama">
          <a href="#shop">Katalog</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#fit">Fit Room</a>
          <a href="#bundle">Bundle</a>
          <a href="#order">Order</a>
        </nav>
        <button className="cart-trigger" type="button" onClick={() => setDrawerOpen(true)}>
          Keranjang <b>{totalItems}</b>
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Premium blank apparel</p>
            <h1>Kaos polos yang kelihatan tenang, tapi jatuhnya mahal.</h1>
            <p>
              Dibuat untuk daily rotation: bahan adem, warna refined, siluet bersih, dan order cepat
              tanpa alur belanja yang ribet.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#shop">
                Belanja Koleksi
              </a>
              <a className="button ghost" href="#fit">
                Cek Size
              </a>
            </div>
            <div className="hero-proof">
              <span>
                <b>24s</b>Cotton combed
              </span>
              <span>
                <b>1x</b>Tukar ukuran
              </span>
              <span>
                <b>6</b>Core pieces
              </span>
            </div>
            <div className="drop-countdown" aria-label="Countdown drop">
              <span>Drop ends in</span>
              <b>03</b>
              <small>days</small>
              <b>18</b>
              <small>hours</small>
            </div>
          </div>

          <div className="hero-product">
            <div className="hero-orbit">
              <img src="/product-stack-tees.png" alt="Model memakai kaos polos hitam premium" />
            </div>
            <div className="drop-panel">
              <span>Current drop</span>
              <strong>Core Series 01</strong>
              <small>Regular / oversized / heavyweight</small>
            </div>
            <div className="texture-chip">
              <img src="/fabric-detail.png" alt="" />
              <span>Rib leher rapi dan padat</span>
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Keunggulan toko">
          <span>Quality checked before shipping</span>
          <span>Muted color palette</span>
          <span>WhatsApp instant order</span>
          <span>Size guidance included</span>
        </section>

        <section className="lookbook" id="lookbook">
          <div className="section-kicker">
            <p className="eyebrow">Lookbook</p>
            <h2>Visual produk dibuat untuk membantu pembeli yakin sebelum order.</h2>
          </div>
          <div className="lookbook-grid">
            <article className="story-card main">
              <img src="/product-stack-tees.png" alt="Kaos polos hitam dipakai model" />
              <div>
                <span>01</span>
                <strong>Oversized drape</strong>
              </div>
            </article>
            <article className="story-card stack">
              <img src="/lookbook-black-tee.png" alt="Tumpukan kaos polos premium" />
              <div>
                <span>02</span>
                <strong>Color rotation</strong>
              </div>
            </article>
            <article className="story-card detail">
              <img src="/fabric-detail.png" alt="Detail bahan dan jahitan kaos" />
              <div>
                <span>03</span>
                <strong>Fabric close-up</strong>
              </div>
            </article>
          </div>
        </section>

        <section className="fabric-lab">
          <div>
            <p className="eyebrow">Fabric lab</p>
            <h2>Bahan terasa lembut, leher tetap rapi, warna mudah dipakai ulang.</h2>
          </div>
          <div className="fabric-specs">
            <article>
              <span>01</span>
              <strong>Soft touch</strong>
              <p>Cotton combed dipilih untuk rasa adem dan nyaman dipakai lama.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Clean rib</strong>
              <p>Rib leher dibuat lebih padat agar bentuknya tetap rapi setelah dicuci.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Daily palette</strong>
              <p>Warna core dibuat muted agar gampang masuk ke outfit harian.</p>
            </article>
          </div>
        </section>

        <section className="shop" id="shop">
          <div className="shop-head">
            <div>
              <p className="eyebrow">Shop the drop</p>
              <h2>Koleksi yang siap masuk rotasi harian.</h2>
            </div>
            <div className="shop-console">
              <label>
                Search
                <input
                  type="search"
                  placeholder="Cari warna, fit, produk..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <label>
                Sort
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Harga rendah</option>
                  <option value="price-high">Harga tinggi</option>
                  <option value="stock">Stok terbatas</option>
                </select>
              </label>
            </div>
          </div>

          <div className="filters" aria-label="Filter produk">
            {[
              ["all", "Semua"],
              ["regular", "Regular"],
              ["oversized", "Oversized"],
              ["limited", "Limited"],
            ].map(([value, label]) => (
              <button
                className={filter === value ? "active" : ""}
                key={value}
                type="button"
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                onQuickView={() => setQuickView(product)}
              />
            ))}
          </div>

          {!visibleProducts.length && <p className="empty-state">Produk tidak ditemukan.</p>}
        </section>

        <section className="bundle-lab" id="bundle">
          <div className="bundle-copy">
            <p className="eyebrow">Bundle builder</p>
            <h2>Ambil 3 kaos core, hemat Rp39.000.</h2>
            <p>Pilih kombinasi warna untuk rotasi seminggu. Default size bundle masuk sebagai L dan bisa dikonfirmasi lagi lewat WhatsApp.</p>
            <div className="bundle-total">
              <span>{bundle.length} / 3 dipilih</span>
              <strong>{rupiah.format(bundleTotal)}</strong>
            </div>
            <button className="button primary full" type="button" onClick={addBundleToCart} disabled={bundle.length !== 3}>
              Masukkan Bundle
            </button>
          </div>
          <div className="bundle-picks">
            {products.slice(0, 5).map((product) => (
              <button
                className={bundle.includes(product.id) ? "bundle-item selected" : "bundle-item"}
                key={product.id}
                type="button"
                onClick={() => toggleBundle(product.id)}
              >
                <img src={product.image} alt="" style={{ objectPosition: product.position }} />
                <span>{product.name}</span>
                <b>{rupiah.format(product.price)}</b>
              </button>
            ))}
          </div>
        </section>

        <section className="fit-room" id="fit">
          <div className="fit-card">
            <p className="eyebrow">Fit room</p>
            <h2>Rekomendasi size tanpa tebak-tebakan.</h2>
            <div className="fit-inputs">
              <label>
                Tinggi badan
                <input
                  type="number"
                  min="140"
                  max="205"
                  value={fit.height}
                  onChange={(event) => setFit({ ...fit, height: Number(event.target.value) })}
                />
              </label>
              <label>
                Berat badan
                <input
                  type="number"
                  min="35"
                  max="130"
                  value={fit.weight}
                  onChange={(event) => setFit({ ...fit, weight: Number(event.target.value) })}
                />
              </label>
            </div>
            <div className="result-card">
              <span>Ukuran yang disarankan</span>
              <strong>{recommendation()}</strong>
            </div>
          </div>

          <div className="service-board">
            <article>
              <span>01</span>
              <strong>QC sebelum kirim</strong>
              <p>Jahitan, noda, dan size dicek agar produk sampai dalam kondisi rapi.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Tukar ukuran 1x</strong>
              <p>Lebih tenang saat memilih size pertama selama stok pengganti tersedia.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Pesan cepat</strong>
              <p>Keranjang langsung berubah jadi pesan WhatsApp yang siap dikirim.</p>
            </article>
          </div>
        </section>

        <section className="size-chart">
          <div>
            <p className="eyebrow">Size chart</p>
            <h2>Ukuran jelas sebelum checkout.</h2>
          </div>
          <div className="size-grid">
            {[
              ["S", "48 cm", "68 cm"],
              ["M", "51 cm", "70 cm"],
              ["L", "54 cm", "73 cm"],
              ["XL", "57 cm", "76 cm"],
            ].map(([size, width, length]) => (
              <article key={size}>
                <strong>{size}</strong>
                <span>Lebar {width}</span>
                <span>Panjang {length}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="social-proof">
          <div className="section-kicker">
            <p className="eyebrow">Customer notes</p>
            <h2>Review singkat dari pembeli pertama.</h2>
          </div>
          <div className="review-grid">
            {reviews.map(([name, city, text]) => (
              <blockquote key={name}>
                <p>{text}</p>
                <cite>{name}, {city}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>Pertanyaan yang sering ditanyakan.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="order-strip" id="order">
          <div>
            <p className="eyebrow">Order flow</p>
            <h2>Pilih produk, masukkan keranjang, konfirmasi via WhatsApp.</h2>
          </div>
          <button className="button primary" type="button" onClick={() => setDrawerOpen(true)}>
            Buka Keranjang
          </button>
        </section>
      </main>

      <CartDrawer
        cart={cart}
        open={drawerOpen}
        totalPrice={totalPrice}
        onClose={() => setDrawerOpen(false)}
        onCheckout={checkout}
        onQty={updateQty}
      />

      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} onAdd={addToCart} />}

      <button className="floating-cart" type="button" onClick={() => setDrawerOpen(true)}>
        <span>{totalItems} item</span>
        <strong>{rupiah.format(totalPrice)}</strong>
      </button>

      <nav className="mobile-dock" aria-label="Navigasi mobile">
        <a href="#shop">Shop</a>
        <a href="#bundle">Bundle</a>
        <button type="button" onClick={() => setDrawerOpen(true)}>Cart {totalItems}</button>
      </nav>
    </>
  );
}

function ProductCard({ product, onAdd, onQuickView }) {
  return (
    <article className="product-card">
      <button className="product-image" type="button" style={{ "--position": product.position }} onClick={onQuickView}>
        <img src={product.image} alt={product.name} />
        <span className="product-badge">{product.badge}</span>
        <span className="stock-pill">{product.stock} left</span>
      </button>
      <form
        className="product-info"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(product, new FormData(event.currentTarget));
        }}
      >
        <div className="product-title">
          <div>
            <h3>{product.name}</h3>
            <small>{product.fit}</small>
          </div>
          <strong>{rupiah.format(product.price)}</strong>
        </div>
        <p>{product.desc}</p>
        <div className="product-options">
          <select name="size" aria-label={`Pilih ukuran ${product.name}`}>
            {product.sizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
          <div className="swatches">
            {product.colors.map((color, index) => (
              <label key={color} title={color}>
                <input name="color" type="radio" value={color} defaultChecked={index === 0} />
                <span style={{ background: colorMap[color] }} />
              </label>
            ))}
          </div>
        </div>
        <div className="card-actions">
          <button className="button primary full" type="submit">
            Tambah
          </button>
          <button className="button icon" type="button" onClick={onQuickView} aria-label={`Detail ${product.name}`}>
            Detail
          </button>
        </div>
      </form>
    </article>
  );
}

function QuickView({ product, onClose, onAdd }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="quick-modal" role="dialog" aria-modal="true" aria-label={`Detail ${product.name}`} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose}>
          X
        </button>
        <div className="modal-image" style={{ "--position": product.position }}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className="modal-copy">
          <p className="eyebrow">{product.badge}</p>
          <h2>{product.name}</h2>
          <p>{product.desc}</p>
          <dl>
            <div>
              <dt>Material</dt>
              <dd>{product.material}</dd>
            </div>
            <div>
              <dt>Weight</dt>
              <dd>{product.weight}</dd>
            </div>
            <div>
              <dt>Stock</dt>
              <dd>{product.stock} pcs</dd>
            </div>
          </dl>
          <div className="modal-options">
            <select value={size} onChange={(event) => setSize(event.target.value)}>
              {product.sizes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <div className="swatches">
              {product.colors.map((item) => (
                <label key={item} title={item}>
                  <input name="modal-color" type="radio" checked={color === item} onChange={() => setColor(item)} />
                  <span style={{ background: colorMap[item] }} />
                </label>
              ))}
            </div>
          </div>
          <button className="button primary full" type="button" onClick={() => onAdd(product, { size, color })}>
            Tambah ke Keranjang - {rupiah.format(product.price)}
          </button>
        </div>
      </section>
    </div>
  );
}

function CartDrawer({ cart, open, totalPrice, onClose, onCheckout, onQty }) {
  return (
    <aside className={open ? "cart-drawer open" : "cart-drawer"} aria-label="Keranjang belanja">
      <div className="drawer-head">
        <strong>Keranjang</strong>
        <button type="button" onClick={onClose} aria-label="Tutup keranjang">
          X
        </button>
      </div>
      <div className="drawer-list">
        {cart.length ? (
          cart.map((item) => (
            <div className="drawer-item" key={item.key}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.size} / {item.color}
                </span>
                <div className="qty">
                  <button type="button" onClick={() => onQty(item.key, -1)}>
                    -
                  </button>
                  <b>{item.qty}</b>
                  <button type="button" onClick={() => onQty(item.key, 1)}>
                    +
                  </button>
                </div>
              </div>
              <strong>{rupiah.format(item.price * item.qty)}</strong>
            </div>
          ))
        ) : (
          <p className="empty-state">Keranjang masih kosong.</p>
        )}
      </div>
      <div className="drawer-total">
        <span>Total</span>
        <strong>{rupiah.format(totalPrice)}</strong>
      </div>
      <button className="button primary full" type="button" onClick={onCheckout} disabled={!cart.length}>
        Pesan via WhatsApp
      </button>
    </aside>
  );
}
