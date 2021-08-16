import React from "react";
import { Layout } from "../components/Layout";
import { getProductNumSumInCart, ORDER_KEY } from "../lib/storage";
import { Order } from "../lib/types";

interface Props {}

const OrderPage: React.FC<Props> = () => {
  const order = JSON.parse(localStorage.getItem(ORDER_KEY) as string) as Order;
  return (
    <Layout cartCount={getProductNumSumInCart()}>
      <h1>注文の詳細</h1>
      <p>注文日時:{order.orderedAt}:</p>
      <p>配達日時:{order.deliveryDate}</p>
      <p>受け取り場所:{order.pickupLocation.name}</p>
      <h1>注文した商品</h1>
      {order.items.map((item) => {
        return (
          <div key={item.product.id}>
            <img src={item.product.imageUrl} alt={"商品の画像"} />
            <p>
              {item.product.name} {item.product.price}円
            </p>
            <p>{item.quantity}個</p>
          </div>
        );
      })}
      <p>合計:{order.totalAmount}円</p>
    </Layout>
  );
};

export default OrderPage;
