import type { NextPage } from "next";
import { useRouter } from "next/router";

const ProductDetail: NextPage = () => {
  const router = useRouter();
  const productId = router.query.productId;
  return <h1>Product {productId}</h1>;
};

export default ProductDetail;
