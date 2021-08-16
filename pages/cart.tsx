import React from "react";
import { Layout } from "../components/Layout";
import { getCartItems, getPriceSum } from "../lib/storage";

interface Props {}

const CartPage: React.FC<Props> = () => {
  const cartItems = getCartItems();
  return (
    <Layout>
      {cartItems.map((cartItem) => {
        return (
          <div key={cartItem.product.id}>
            <img src={cartItem.product.imageUrl} alt={"商品の画像"} />
            <p>
              {cartItem.product.name} {cartItem.product.price}円
            </p>
            <p>{cartItem.quantity}</p>
          </div>
        );
      })}
      <p>合計:{getPriceSum()} 円</p>
      <button
        onClick={() => {
          alert("注文しました");
        }}
      >
        注文する
      </button>
    </Layout>
  );
};

export default CartPage;
