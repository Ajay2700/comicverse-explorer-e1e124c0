import { Comic } from "@/data/comics";

export interface CartItem {
  comic: Comic;
  quantity: number;
}

const CART_STORAGE_KEY = "comicverse_cart";

export const getCart = (): CartItem[] => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const addToCart = (comic: Comic): void => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.comic.id === comic.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ comic, quantity: 1 });
  }

  saveCart(cart);
};

export const removeFromCart = (comicId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.comic.id !== comicId);
  saveCart(updatedCart);
};

export const updateQuantity = (comicId: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(comicId);
    return;
  }

  const cart = getCart();
  const item = cart.find((item) => item.comic.id === comicId);

  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.comic.price * item.quantity, 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

export const clearCart = (): void => {
  saveCart([]);
};
