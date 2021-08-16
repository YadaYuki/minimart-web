import { Product, CartItem } from "./types";

export const CART_KEY = "cart";

export const addToCart = (product: Product) => {
  const cartItemStr = localStorage.getItem(CART_KEY);
  let cartItems: CartItem[];
  if (cartItemStr == null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(cartItemStr) as CartItem[];
  }
  const cartItemIdx = cartItems.findIndex((cartItem: CartItem) => {
    return cartItem.product.id === product.id;
  });
  if (cartItemIdx === -1) {
    cartItems.push({ product, quantity: 1 });
  } else {
    cartItems[cartItemIdx].quantity++;
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
};

export const getProductNumSumInCart = (): number => {
  const cartItemStr = window.localStorage.getItem(CART_KEY);
  if (cartItemStr == null) {
    return 0;
  }
  const cartItems = JSON.parse(cartItemStr) as CartItem[];
  return sumArray(cartItems.map((cartItem) => cartItem.quantity));
};

export const getCartItems = (): CartItem[] => {
  const cartItemStr = window.localStorage.getItem(CART_KEY);
  if (cartItemStr == null) {
    return [];
  }
  return JSON.parse(cartItemStr) as CartItem[];
};

export const getPriceSum = (): number => {
  const cartItemStr = window.localStorage.getItem(CART_KEY);
  if (cartItemStr == null) {
    return 0;
  }
  const cartItems = JSON.parse(cartItemStr) as CartItem[];
  return sumArray(cartItems.map((cartItem) => cartItem.product.price * cartItem.quantity));
};

export const incrementQuantity = (id: string) => {
  const cartItemStr = window.localStorage.getItem(CART_KEY);
  if (cartItemStr == null) {
    return 0;
  }
  const cartItems = JSON.parse(cartItemStr) as CartItem[];
  const cartItemIdx = cartItems.findIndex((cartItem: CartItem) => {
    return cartItem.product.id === id;
  });
  if (cartItemIdx == -1) {
    return;
  }
  cartItems[cartItemIdx].quantity++;
};

export const decrementQuantity = (id: string) => {
  const cartItemStr = window.localStorage.getItem(CART_KEY);
  if (cartItemStr == null) {
    return 0;
  }
  const cartItems = JSON.parse(cartItemStr) as CartItem[];
  const cartItemIdx = cartItems.findIndex((cartItem: CartItem) => {
    return cartItem.product.id === id;
  });
  if (cartItemIdx == -1) {
    return;
  }
  cartItems[cartItemIdx].quantity--;
};

const sumArray = (array: number[]): number => {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};
