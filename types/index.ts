export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
