# UrbanWear Online Shop

Modern fashion ecommerce demo built with Next.js App Router, TypeScript, Tailwind CSS, Zustand, Framer Motion-ready structure, Lucide icons, local dummy data, and localStorage cart/wishlist persistence.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Open Vercel and import the repository.
3. Framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Output directory: leave default.
6. Deploy.

## Implemented Features

- Home page with hero, promo strip, categories, best sellers, arrivals, custom promo, testimonials, newsletter.
- Product listing with search, category, size, color, price, sort, empty state.
- Product detail with gallery, color/size/qty selectors, wishlist, size chart modal, WhatsApp buy link.
- Custom t-shirt demo with upload preview, text, print position, color, price estimate, WhatsApp order.
- Cart with localStorage persistence, quantity update, remove item, subtotal, shipping, total.
- Checkout form with required validation and WhatsApp checkout message.
- Size guide, lookbook, about, and contact pages.
- Zustand cart and wishlist store.

## Important Files

- `data/products.ts` - edit dummy product data.
- `store/use-shop-store.ts` - cart and wishlist state.
- `components/product-card.tsx` - reusable product card and quick view.
- `components/site-header.tsx` - navbar and mobile menu.
- `app/checkout/page.tsx` - WhatsApp checkout message.
- `lib/utils.ts` - currency formatter and WhatsApp phone placeholder.

## WhatsApp Number

Update the placeholder in `lib/utils.ts`:

```ts
export const whatsappNumber = "6281234567890";
```
