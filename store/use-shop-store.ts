"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  selectedColor: string;
  selectedSize: string;
  price: number;
  quantity: number;
};

type WishlistItem = { productId: string };

type ShopState = {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
};

export const cartKey = (item: Pick<CartItem, "productId" | "selectedColor" | "selectedSize">) =>
  `${item.productId}-${item.selectedColor}-${item.selectedSize}`;

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      addToCart: (item) =>
        set((state) => {
          const key = cartKey(item);
          const exists = state.cart.find((cartItem) => cartKey(cartItem) === key);
          if (exists) {
            return {
              cart: state.cart.map((cartItem) =>
                cartKey(cartItem) === key
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (key) => set((state) => ({ cart: state.cart.filter((item) => cartKey(item) !== key) })),
      updateQuantity: (key, quantity) =>
        set((state) => ({
          cart: state.cart
            .map((item) => (cartKey(item) === key ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (productId) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.productId === productId);
          return {
            wishlist: exists
              ? state.wishlist.filter((item) => item.productId !== productId)
              : [...state.wishlist, { productId }],
          };
        }),
      isWishlisted: (productId) => get().wishlist.some((item) => item.productId === productId),
    }),
    { name: "urbanwear-shop" },
  ),
);
