import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { IProduct } from '../../types';

const ProductDetail: NextPage<Props> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        {product.id} {product.title} {product.price}
      </h2>
      <p>{product.description}</p>
      <hr />
    </div>
  );
};

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { productId: '1' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('Generating / Regenerating Product Detail');
  const { productId } = params as IParam;
  const response = await fetch(`http://localhost:4000/products/${productId}`);
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: data,
    },
    revalidate: 10,
  };
};

interface IParam extends ParsedUrlQuery {
  productId: string;
}

type Props = {
  product: IProduct;
};
