import { GetServerSideProps, NextPage } from 'next';
import { IEvent } from '../../types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EventList: NextPage<Props> = ({ eventList }) => {
  const [events, setEvents] = useState(eventList);
  const router = useRouter();

  const fetchSportsEvents = async () => {
    const response = await fetch(
      `http://localhost:4000/events?category=sports`
    );
    const data = await response.json();
    setEvents(data);
    router.push('events?category=sports', undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (window.location.pathname === '/events') {
        window.location.href = as;
        return false;
      }
      return true;
    });
  }, []);

  return (
    <>
      <button onClick={fetchSportsEvents}>Sports Events</button>
      <h1>List of events</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>
            {event.id} {event.title} {event.date} | {event.category}
          </h2>
          <p>{event.description}</p>
          <hr />
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { category } = query;
  const queryParams = category ? 'category=sports' : '';
  const response = await fetch(`http://localhost:4000/events?${queryParams}`);
  const data = await response.json();

  return {
    props: {
      eventList: data,
    },
  };
};

export default EventList;

type Props = {
  eventList: IEvent[];
};
