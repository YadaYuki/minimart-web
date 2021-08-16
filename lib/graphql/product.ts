import { graphqlRequest } from "./graphqlClient";
import { Product, OrderItemInput, Order } from "../types";

const listProductsQuery = `
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export async function listProducts(): Promise<Product[]> {
  const data = await graphqlRequest({ query: listProductsQuery });
  return data.products;
}

const detailProductsQuery = `
query getProduct($id: ID!){
  product(id: $id) {
    id
    name
    description
    imageUrl
    price
  }
}
`;

export async function getProductDetail(id: string): Promise<Product> {
  const data = await graphqlRequest({ query: detailProductsQuery, variables: { id } }); // TODO:fix to id
  return data.product;
}

const createOrderMutation = `
mutation postOrder($items: [OrderItemInput!]!){
  createOrder(input:{items:$items}){
    order{
      id
      canceledAt
      deliveryDate
      orderedAt
      totalAmount
      pickupLocation{
        id
        name
      }
      items{
        product{
          id
          name
          price
          description
          imageUrl
        }
        quantity
      }
  }
  }
}
`;

// const mock: OrderItemInput[] = [
//   {
//     productId: "UHJvZHVjdC0x",
//     quantity: 2,
//   },
//   {
//     productId: "UHJvZHVjdC01",
//     quantity: 1,
//   },
// ];

export async function createOrder(orderItemInputs: OrderItemInput[]): Promise<Order> {
  const data = await graphqlRequest({
    query: createOrderMutation,
    variables: { items: orderItemInputs },
  });
  return data.createOrder.order;
}
