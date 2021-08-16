import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { Product } from "../../lib/types";
import { getProductDetail } from "../../lib/graphql/product";
import { Layout } from "../../components/Layout";
import { addToCart } from "../../lib/storage";

interface Props {
  product: Product;
}

const DetailPage: NextPage<Props> = ({ product }) => {
  const handleClick = () => {
    addToCart(product);
  };
  return (
    <Layout>
      <div>
        <img src={product.imageUrl} alt="食材の写真" />
        <h2>{product.name}</h2>
        <p>{product.price}円</p>
        <p>{product.description}</p>
        <button onClick={handleClick}>カートに追加する</button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (id == null) {
    // throw Error
  }
  const data = await getProductDetail(id as string);
  return { props: { product: data } };
};

export default DetailPage;
