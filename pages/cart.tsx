import React, { useCallback, useState } from "react";
import { Layout } from "../components/Layout";
import {
  getCartItems,
  getPriceSum,
  getProductNumSumInCart,
  decrementQuantity,
  incrementQuantity,
} from "../lib/storage";

interface Props {}

const CartPage: React.FC<Props> = () => {
  const cartItems = getCartItems();
  const [count, setCount] = useState(getProductNumSumInCart());
  const handlePlus = useCallback((id: string) => {
    return (_: React.MouseEvent) => {
      incrementQuantity(id);
    };
  }, []);
  const handleMinus = (id: string) => {
    return (_: React.MouseEvent) => {
      decrementQuantity(id);
    };
  };
  return (
    <Layout cartCount={count}>
      {cartItems.map((cartItem) => {
        return (
          <div key={cartItem.product.id}>
            <img src={cartItem.product.imageUrl} alt={"商品の画像"} />
            <p>
              {cartItem.product.name} {cartItem.product.price}円
            </p>
            <p>{cartItem.quantity}</p>
            <button onClick={handlePlus(cartItem.product.id)}>+</button>
            <button onClick={handleMinus(cartItem.product.id)}> -</button>
          </div>
        );
      })}
      <p>合計:{getPriceSum()} 円</p>
      <button
        onClick={() => {
          alert("注文しました");
          localStorage.clear();
          location.href = "/";
        }}
      >
        注文する
      </button>
    </Layout>
  );
};

export default CartPage;
