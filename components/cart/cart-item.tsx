import React, { useState } from "react";
import { CartItem } from "../../lib/types";

interface Props {
  cartItem: CartItem;
  handlePlus: (id: string) => void;
  handleMinus: (id: string) => void;
}

const CartCard: React.FC<Props> = ({ cartItem, handlePlus, handleMinus }) => {
  const [quantity, setQueantity] = useState(cartItem.quantity);
  return (
    <div key={cartItem.product.id}>
      <img src={cartItem.product.imageUrl} alt={"商品の画像"} />
      <p>
        {cartItem.product.name} {cartItem.product.price}円
      </p>
      <p>{quantity}</p>
      <button
        onClick={() => {
          handlePlus(cartItem.product.id); // increment storage
          setQueantity(quantity + 1); // increment local state for view
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          handleMinus(cartItem.product.id); // increment storage
          setQueantity(quantity - 1); // increment local state for view
        }}
      >
        -
      </button>
    </div>
  );
};

export default CartCard;
