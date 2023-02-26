import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { throttle } from 'throttle-debounce';
import '../InfiniteScroll.css';

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

export default function InfiniteScrollUI() {
  const listRef = useRef<HTMLUListElement>(null)
  const currentPageRef = useRef<number>(0);

  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);

  const getPassengers = async (init?: boolean) => {
    const params = { page: currentPageRef.current, size: 30 };

    try {
      const response = await axios.get('https://api.instantwebtools.net/v1/passenger', { params });

      const passengers = response.data.data;
      const isLast = response.data.totalPages === currentPageRef.current;

      init ? setPassengers(passengers) : setPassengers(prev => [...prev, ...passengers]);
      setIsLast(isLast);

    } catch (e) {
      console.error(e);
    }
  }

  const handleScroll = throttle(1000, () => {
    if (listRef.current) {
      const { scrollHeight, offsetHeight, scrollTop } = listRef.current;
      const offset = 50;
      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  })

  useEffect(() => {
    if (isScrollBottom) {
      currentPageRef.current += 1;
      !isLast && getPassengers();
    }
  }, [isScrollBottom, isLast])

  useEffect(() => {
    getPassengers(true);
  }, [])

  return (
    <div className='App'>
      <ul ref={listRef} className='list' onScroll={handleScroll}>
        {
          passengers.map(passenger => (<li className='item' key={passenger._id}>{passenger.name}</li>))
        }
      </ul>
    </div>
  );
}

