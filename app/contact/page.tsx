import { MessageCircle, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/form";
import { whatsappNumber } from "@/lib/utils";

export default function ContactPage() {
  return (
    <main className="section-shell">
      <p className="text-sm font-black uppercase text-emerald-300">Contact</p>
      <h1 className="mb-8 text-5xl font-black sm:text-7xl">Talk to UrbanWear.</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <form className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
          <Input placeholder="Full name" />
          <Input placeholder="Email / WhatsApp" />
          <Textarea placeholder="Message" />
          <Button type="button">Send message</Button>
        </form>
        <aside className="grid gap-4">
          <a className="flex items-center gap-3 rounded-3xl border border-white/10 bg-green-500 p-5 font-black text-zinc-950" href={`https://wa.me/${whatsappNumber}`} target="_blank"><MessageCircle /> Chat WhatsApp</a>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><Phone className="mb-4 text-emerald-300" /><strong>Customer support</strong><p className="text-zinc-400">Senin-Sabtu, 09.00-18.00 WIB</p></div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><MapPin className="mb-4 text-emerald-300" /><strong>Store location</strong><p className="text-zinc-400">Jakarta, Indonesia. Demo location only.</p></div>
        </aside>
      </div>
    </main>
  );
}
