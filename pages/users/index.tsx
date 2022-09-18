import type { NextPage, GetStaticProps } from 'next';
import User from '../../components/user';
import { IUser } from '../../types';

const UsersList: NextPage<Props> = ({ users }) => {
  return (
    <>
      <h1>Users list:</h1>
      {users.map((user: any) => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        );
      })}
    </>
  );
};

export default UsersList;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return {
    props: {
      users,
    },
  };
};

type Props = {
  users: IUser[];
};
