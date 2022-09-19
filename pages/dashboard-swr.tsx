import useSWR, { Fetcher } from 'swr';
import { IDashboard } from '../types';

const fetcher: Fetcher<IDashboard> = async () => {
  const response = await fetch('http://localhost:4000/dashboard');
  const data = await response.json();
  return data;
};

const DashboardSWR = () => {
  const { data, error } = useSWR<IDashboard, Error>('dashboard', fetcher);
  if (error) {
    console.log(error);
    return 'An error has occured';
  }
  if (!data) return 'Loading';

  return (
    <div>
      <h2>Dashboard</h2>
      <h2>Posts - {data.posts}</h2>
      <h2>Likes - {data.likes}</h2>
      <h2>Followers - {data.followers}</h2>
      <h2>Following - {data.following}</h2>
    </div>
  );
};

export default DashboardSWR;
