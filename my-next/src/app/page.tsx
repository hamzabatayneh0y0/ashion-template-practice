'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { increment, decrement } from '@/store/slices/counter';
import { Button } from '@/components/ui/button';
import  Link  from 'next/link';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1 className="text-2xl">Count: {count}</h1>
      <button onClick={() => dispatch(increment())} className="btn">+</button>
      <button onClick={() => dispatch(decrement())} className="btn">-</button>
     <div className="mt-4">
       <Button variant={"link"}>
      <Link href="/second" className="">Go to Second Page</Link>
      </Button>
         <Button variant={"link"}>
      <Link href="/third" className="">Go to third Page</Link>
      </Button>
      </div>
    </div>
    
  );
}

