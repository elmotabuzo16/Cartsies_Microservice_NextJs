'use client'

import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { Auction, PagedResult } from '@/types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import { useParamsStore } from '../hooks/useParamsStore';
import { useShallow } from 'zustand/shallow';
import queryString from 'query-string';
import EmptyFilter from '../components/EmptyFilter';



export default function Listings() {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(useShallow(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy
  })));
  // Used for setting a data/auction
  const setParams = useParamsStore(state => state.setParams);
  // Used for query string for pagination, filter, and search
  const url = queryString.stringifyUrl({url: '', query: params})

  function setPageNumber(pageNumber: number) {
    setParams({pageNumber})
  }

  useEffect(() => {
    getData(url).then(data => {
      setData(data);
    })
  }, [url])

  if (!data) {
    // Optionally, you can render a loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <>
      <Filters />

      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className='grid grid-cols-4 gap-6'>
            {data.results.map(auction => (
                <AuctionCard auction={auction} key={auction.id} />
              ))}
          </div>
          <div className='flex justify-center mt-4'>
          <AppPagination pageChanged={setPageNumber}
                currentPage={params.pageNumber} pageCount={data.pageCount} />
          </div>

        </>
      )}
    </>
  );
}
