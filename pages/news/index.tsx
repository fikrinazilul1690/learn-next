import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { INews } from '../../types';

const Article: NextPage<Props> = ({ articles, category }) => {
  const router = useRouter();

  if (router.query['category']) {
    return (
      <>
        <h1>Showing list of category {category}</h1>
        {articles.map((article) => (
          <div key={article.id}>
            <h2>
              <Link href={`/news/${article.id}`}>
                <a>
                  {article.id} {article.title}
                </a>
              </Link>
            </h2>
            <p>{article.description}</p>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <h1>List of News Articles</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>
            <Link href={`/news/${article.id}`}>
              <a>
                {article.id} {article.title} |
              </a>
            </Link>{' '}
            <Link href={`/news?category=${article.category}`}>
              <a>{article.category}</a>
            </Link>
          </h2>
        </div>
      ))}
    </>
  );
};

export default Article;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  resolvedUrl,
}) => {
  const { category } = query as IQuery;
  const response = await fetch(`http://localhost:4000${resolvedUrl}`);
  const data = await response.json();

  return {
    props: {
      articles: data,
      category: category || null,
    },
  };
};

type Props = {
  articles: INews[];
  category: string;
};

interface IQuery extends ParsedUrlQuery {
  category: string;
}
