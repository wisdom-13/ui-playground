import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_guaters: string;
  website: string;
  established: string;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline,
  __v: number;
}

interface Response {
  tatalPassengers: number;
  totalPages: number;
  data: Array<Passenger>;
}

export default function PaginationUI() {

  const [page, setPage] = useState(0);
  const [totalPages, setotalPages] = useState(0);
  const [items, setItems] = useState<Array<Passenger>>([]);

  const handlePageChange = (currentPage: number): void => {
    setPage(currentPage);
  }

  useEffect(() => {
    const fetch = async () => {
      const params = { page, size: 10 };
      const { data: { totalPages, data } } = await axios.get<Response>('https://api.instantwebtools.net/v1/passenger', { params })

      setotalPages(totalPages);
      setItems(data);
    }

    fetch();
  }, [page])

  return (
    <div>
      <ul>
        {
          items.map(item => (

            <li key={item._id}>{item.name}</li>
          ))
        }
      </ul>
      <Pagination count={totalPages} page={page} onPageChange={handlePageChange} />
    </div>
  );
}

