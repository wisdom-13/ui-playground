import axios from 'axios';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  hand_quaters: string;
  website: string;
  established: string;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline;
  __v: number;
}

interface Props {
  isLastItem: boolean;
  onFetchMorePassengers: () => void;
  children?: ReactNode;
}

const Passenger: React.FC<Props> = ({ isLastItem, onFetchMorePassengers, children }) => {

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMorePassengers();
  }, [isLastItem, isIntersecting])

  return (
    <div
      ref={ref}
      style={{
        minHeight: '10vh',
        display: 'flex',
        border: '1px #000 dashed'
      }}>
      {children}
    </div>
  )
}


export default function IntersectionObserverUI() {

  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const getPassengers = async (init?: boolean) => {
    const params = { size: 30, page };

    try {
      const response = await axios.get('https://api.instantwebtools.net/v1/passenger', { params });

      const passengers = response.data.data;
      const isLast = response.data.totalPages === page;

      setPassengers(prev => [...prev, ...passengers]);
      setIsLast(isLast);

    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    !isLast && getPassengers();
  }, [page]);


  return (
    <div>
      {
        passengers.map((passenger, idx) => (
          <Passenger
            key={passenger._id}
            isLastItem={passengers.length - 1 === idx}
            onFetchMorePassengers={() => setPage(prev => prev + 1)}
          >{passenger.name}</Passenger>
        ))
      }
    </div>
  );
}

