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
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data: IPost[] = await response.json();

  const paths = data.map((post) => {
    return {
      params: {
        postId: `${post.id}`,
      },
    };
  });
  return {
    paths,
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
