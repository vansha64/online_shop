import "./globals.css";

export const metadata = {
  title: "Oblong Lab - Kaos Polos Premium",
  description:
    "Kaos polos premium berbahan nyaman, warna harian, size guide, dan pemesanan cepat via WhatsApp.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
