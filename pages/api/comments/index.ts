import { comments } from './../../../data/comments';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).send(comments);
}
