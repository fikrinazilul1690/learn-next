import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { IPost } from '../../types';
import { ParsedUrlQuery } from 'querystring';

const Post: NextPage<Props> = ({ post }) => {
  return (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          postId: '1',
        },
      },
      {
        params: {
          postId: '2',
        },
      },
      {
        params: {
          postId: '3',
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { postId } = params as IParams;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
};

type Props = {
  post: IPost;
};

interface IParams extends ParsedUrlQuery {
  postId: string;
}
