import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { INews } from '../../types';

const ArticleListByCategory: NextPage<Props> = ({ article }) => {
  return (
    <>
      <h1>Showing news</h1>
      <div key={article.id}>
        <h2>
          {article.id} {article.title}
        </h2>
        <p>{article.description}</p>
        <hr />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { newsId } = params as IParams;
  const response = await fetch(`http://localhost:4000/news/${newsId}`);
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: data,
    },
  };
};

export default ArticleListByCategory;

interface IParams extends ParsedUrlQuery {
  newsId: string;
}

type Props = {
  article: INews;
};
