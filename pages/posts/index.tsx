import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { IPost } from '../../types';

const PostList: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`} passHref>
              <a>
                <h2>
                  {post.id} {post.title}
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

export default PostList;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  return {
    props: {
      posts: data.slice(0, 3),
    },
  };
};

type Props = {
  posts: IPost[];
};
