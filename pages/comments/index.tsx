import { NextPage } from 'next';
import { useState } from 'react';
import { IComment } from '../../data/comments';

interface Props {}

const CommentsPage: NextPage<Props> = ({}) => {
  const [comments, setComments] = useState<Array<IComment>>([]);
  const fetchComments = async () => {
    const response = await fetch('/api/comments');
    const data = await response.json();
    setComments(data);
  };

  return (
    <>
      <button onClick={fetchComments}>Load Comments</button>
      {comments.map((comment) => (
        <div key={comment.id}>
          {comment.id} {comment.text}
        </div>
      ))}
    </>
  );
};

export default CommentsPage;
