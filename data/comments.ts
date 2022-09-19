export interface IComment {
  id: number;
  text: string;
}

export const comments: Array<IComment> = [
  {
    id: 1,
    text: 'This is the first comment',
  },
  {
    id: 2,
    text: 'This is the second comment',
  },
  {
    id: 3,
    text: 'This is the third comment',
  },
];
