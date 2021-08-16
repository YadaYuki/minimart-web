export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};

type OrderItem = CartItem;

type PickupLocation = {
  id: string;
  name: string;
};

export type OrderItemInput = {
  productId: string;
  quantity: number;
};

export type Order = {
  canceledAt: string;
  deliveryDate: string;
  id: string;
  items: OrderItem[];
  orderedAt: string;
  pickupLocation: PickupLocation;
  totalAmount: string;
  // user: User!
};
