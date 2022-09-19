import { useEffect, useState } from 'react';
import { IDashboard } from '../../types';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<IDashboard | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchDashboardData() {
      try {
        const response = await fetch('http://localhost:4000/dashboard', {
          signal: controller.signal,
        });
        if (!controller.signal.aborted) {
          const data = await response.json();
          setDashboardData(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.log(err);
        }
      }
    }

    fetchDashboardData();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h2>Posts - {dashboardData?.posts}</h2>
      <h2>Likes - {dashboardData?.likes}</h2>
      <h2>Followers - {dashboardData?.followers}</h2>
      <h2>Following - {dashboardData?.following}</h2>
    </div>
  );
};

export default Dashboard;
