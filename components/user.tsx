import { FC } from 'react';
import { IUser } from '../types';

type Props = {
  user: IUser;
};

const User: FC<Props> = ({ user }) => {
  return (
    <>
      <h2>{user.name}</h2>
      <h2>{user.email}</h2>
    </>
  );
};

export default User;
