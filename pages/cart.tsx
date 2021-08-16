import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import CartCard from "../components/cart/cart-item";
import { Layout } from "../components/Layout";
import { createOrder } from "../lib/graphql/product";
import {
  getCartItems,
  getPriceSum,
  getProductNumSumInCart,
  decrementQuantity,
  incrementQuantity,
  CART_KEY,
  ORDER_KEY,
} from "../lib/storage";
import { Order, OrderItemInput } from "../lib/types";

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
          const cartItems = getCartItems();
          const orderItemInputs: OrderItemInput[] = cartItems.map((cartItem) => {
            return { productId: cartItem.product.id, quantity: cartItem.quantity };
          });
          createOrder(orderItemInputs).then((order: Order) => {
            localStorage.removeItem(CART_KEY);
            alert("注文しました");
            localStorage.setItem(ORDER_KEY, JSON.stringify(order));
            router.push("/order");
          });
        }}
      >
        注文する
      </button>
    </Layout>
  );
};

export default CartPage;
