import { graphqlRequest } from "./graphqlClient";
import { Product } from "../types";

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