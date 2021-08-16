import { FC, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";
import { getProductNumSumInCart } from "../lib/storage";

type Props = {
  // cartCount: number;
};

export const Layout: FC<Props> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (process.browser) {
      setCartCount(getProductNumSumInCart());
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Mini Mart</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Mini Mart</Link>
        </h1>
        <div className={styles.cart}>
          {/* このリンク先はないので新規ページを作る */}
          <Link href="/cart">
            <a>
              <span>🛒</span>
              <span className={styles.cartCount}>({cartCount})</span>
            </a>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
