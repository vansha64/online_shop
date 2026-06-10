"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form";
import { formatRupiah, whatsappNumber } from "@/lib/utils";

export default function CustomPage() {
  const [type, setType] = useState("Basic Tee");
  const [color, setColor] = useState("#111827");
  const [position, setPosition] = useState("Front");
  const [text, setText] = useState("URBAN");
  const [textColor, setTextColor] = useState("#9ff0c9");
  const [preview, setPreview] = useState("");
  const price = useMemo(() => 119000 + (type === "Hoodie" ? 120000 : 0) + (position === "Front + Back" ? 45000 : 25000) + (text ? 15000 : 0), [type, position, text]);

  function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  const message = encodeURIComponent(`Halo BANDIT, saya ingin custom order:\nType: ${type}\nColor: ${color}\nPrint: ${position}\nText: ${text}\nEstimated price: ${formatRupiah.format(price)}`);

  return (
    <main className="section-shell">
      <div className="mb-8">
        <p className="text-sm font-black uppercase text-[#d6ad55]">Custom studio</p>
        <h1 className="text-5xl font-black sm:text-7xl">Design your own tee.</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5">
          <Select value={type} onChange={(event) => setType(event.target.value)}>
            <option>Basic Tee</option>
            <option>Oversize Tee</option>
            <option>Polo Shirt</option>
            <option>Hoodie</option>
          </Select>
          <label className="grid gap-2 text-sm font-bold text-zinc-300">T-shirt color <Input type="color" value={color} onChange={(event) => setColor(event.target.value)} /></label>
          <Select value={position} onChange={(event) => setPosition(event.target.value)}>
            <option>Front</option>
            <option>Back</option>
            <option>Left Chest</option>
            <option>Sleeve</option>
            <option>Front + Back</option>
          </Select>
          <Input type="file" accept="image/*" onChange={upload} />
          <Input placeholder="Custom text" value={text} onChange={(event) => setText(event.target.value)} />
          <label className="grid gap-2 text-sm font-bold text-zinc-300">Text color <Input type="color" value={textColor} onChange={(event) => setTextColor(event.target.value)} /></label>
          <div className="rounded-2xl bg-black/30 p-4">
            <span className="text-zinc-400">Estimated price</span>
            <strong className="block text-3xl">{formatRupiah.format(price)}</strong>
          </div>
          <a className="inline-flex h-12 items-center justify-center rounded-full bg-[#b98a2f] font-black text-zinc-950" href={`https://wa.me/${whatsappNumber}?text=${message}`} target="_blank">Send custom order via WhatsApp</a>
        </section>
        <section className="grid place-items-center rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
          <div className="relative grid h-[520px] w-full max-w-md place-items-center rounded-[3rem]" style={{ background: color }}>
            <div className="absolute top-10 h-16 w-28 rounded-b-full border-b-8 border-black/20" />
            {preview && <img src={preview} alt="Uploaded design preview" className="max-h-36 max-w-48 rounded-xl object-contain" />}
            <strong className="absolute bottom-28 text-4xl" style={{ color: textColor }}>{text}</strong>
            <span className="absolute bottom-5 rounded-full bg-black/40 px-4 py-2 text-sm">{position}</span>
          </div>
        </section>
      </div>
    </main>
  );
}
