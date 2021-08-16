import React from "react";
import { Layout } from "../components/Layout";
import { getCartItems } from "../lib/storage";

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
    </Layout>
  );
};

export default CartPage;
