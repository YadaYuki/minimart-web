import { useState, useEffect, useCallback } from "react";
import { getProductNumSumInCart } from "../storage";

export function useCartItemCount(): { cartItemCount: number; updateCartItemCount: () => void } {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(getProductNumSumInCart());
  }, []);

  const updateCartItemCount = useCallback(() => {
    setCartItemCount(getProductNumSumInCart());
  }, []);

  return { cartItemCount, updateCartItemCount };
}
