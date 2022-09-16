import type { NextPage } from "next";

const UsersList: NextPage = (props: any) => {
  const { users } = props;
  return (
    <>
      <h1>Users list:</h1>
      {users.map((user: any) => {
        return (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
          </div>
        );
      })}
    </>
  );
};

export default UsersList;

export async function getStaticProps(): Promise<{ props: any }> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: [] = await response.json();
  return {
    props: {
      users,
    },
  };
}
