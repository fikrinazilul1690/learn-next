import type { GetStaticProps, NextPage } from 'next';
import { IProduct } from '../../types';
import Link from 'next/link';

const ProductList: NextPage<Props> = ({ products }) => {
  return (
    <>
      <h1>List of products</h1>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Link href={`/products/${product.id}`} passHref>
              <a>
                <h2>
                  {product.id} {product.title} {product.price}
                </h2>
                <hr />
              </a>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ProductList;

export const getStaticProps: GetStaticProps = async () => {
  console.log('Generating / Regenerating ProductList');
  const response = await fetch('http://localhost:4000/products');
  const data = await response.json();

  return {
    props: {
      products: data,
    },
    revalidate: 10,
  };
};

type Props = {
  products: IProduct[];
};
