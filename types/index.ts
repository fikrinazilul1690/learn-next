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

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
}

export interface INews {
  id: number;
  title: string;
  description: string;
  category: string;
}

export interface IDashboard {
  posts: number;
  likes: number;
  followers: number;
  following: number;
}

export interface IEvent extends INews {
  date: string;
}
