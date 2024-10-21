import { Button, ButtonGroup } from 'flowbite-react';
import React from 'react'
import { useParamsStore } from '../hooks/useParamsStore';


const pageSizeButtons = [4, 8, 12];

export default function Filters() {

  const pageSize = useParamsStore(state => state.pageSize);
  const setParams = useParamsStore(state => state.setParams);

  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>Page size</span>
        <ButtonGroup>
          {pageSizeButtons.map((value, i) => (
            <Button key={i} 
              onClick={() => setParams({pageSize: value})}
              color={`${pageSize === value ? 'red' : 'gray'}`}
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  )
}