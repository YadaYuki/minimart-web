import { Product, CartItem } from "./types";

const CART_KEY = "cart";

export const addToCart = (product: Product) => {
  if (process.browser) {
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
  }
};

export const getProductNumSumInCart = (): number => {
  if (process.browser) {
    const cartItemStr = window.localStorage.getItem(CART_KEY);
    if (cartItemStr == null) {
      return 0;
    }
    const cartItems = JSON.parse(cartItemStr) as CartItem[];
    return sumArray(cartItems.map((cartItem) => cartItem.quantity));
  }
  return -1;
};

export const getCartItems = (): CartItem[] => {
  if (process.browser) {
    const cartItemStr = window.localStorage.getItem(CART_KEY);
    if (cartItemStr == null) {
      return [];
    }
    return JSON.parse(cartItemStr) as CartItem[];
  }
  return [];
};

export const getPriceSum = (): number => {
  if (process.browser) {
    const cartItemStr = window.localStorage.getItem(CART_KEY);
    if (cartItemStr == null) {
      return 0;
    }
    const cartItems = JSON.parse(cartItemStr) as CartItem[];
    return sumArray(cartItems.map((cartItem) => cartItem.product.price * cartItem.quantity));
  }
  return 0;
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
