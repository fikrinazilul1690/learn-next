import { comments } from './../../../data/comments';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    res.status(200).send(comments);
  } else if (req.method === 'POST') {
    const comment = req.body.comment;

    const newComment = {
      id: comments.length + 1,
      text: comment,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  }
}
