import { Product, CartItem } from "./types";

const CART_KEY = "cart";

const mock = [
  {
    product: {
      id: "UHJvZHVjdC0x",
      name: "オクラ",
      description:
        "夏バテ防止にネバネバパワーの新鮮オクラをご賞味ください。Mサイズ中心の食べ易い大きさです。グリの野菜は鮮度が生命、オクラのウブ毛を体験して下さい。",
      price: 165,
      imageUrl: "https://minimart-api.s3.ap-northeast-1.amazonaws.com/images/products/1.jpg",
    },
    quantity: 2,
  },
  {
    product: {
      id: "UHJvZHVjdC01",
      name: "ズッキーニ",
      description: "新鮮な食材を市場からお届けします！",
      price: 201,
      imageUrl: "https://minimart-api.s3.ap-northeast-1.amazonaws.com/images/products/5.jpg",
    },
    quantity: 1,
  },
];

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
