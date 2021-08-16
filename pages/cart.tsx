import { useRouter } from "next/dist/client/router";
import React, { useCallback, useState } from "react";
import CartCard from "../components/cart/cart-item";
import { Layout } from "../components/Layout";
import {
  getCartItems,
  getPriceSum,
  getProductNumSumInCart,
  decrementQuantity,
  incrementQuantity,
  CART_KEY,
} from "../lib/storage";

interface Props {}

const CartPage: React.FC<Props> = () => {
  const cartItems = getCartItems();
  const router = useRouter();
  const [count, setCount] = useState(getProductNumSumInCart());
  const handlePlus = (id: string) => {
    incrementQuantity(id);
    setCount(getProductNumSumInCart());
  };
  const handleMinus = (id: string) => {
    decrementQuantity(id);
    setCount(getProductNumSumInCart());
  };
  return (
    <Layout cartCount={count}>
      {cartItems.map((cartItem) => {
        return (
          <CartCard key={cartItem.product.id} cartItem={cartItem} handleMinus={handleMinus} handlePlus={handlePlus} />
        );
      })}
      <p>合計:{getPriceSum()} 円</p>
      <button
        onClick={() => {
          alert("注文しました");
          localStorage.removeItem(CART_KEY);
          router.push("/");
        }}
      >
        注文する
      </button>
    </Layout>
  );
};

export default CartPage;
