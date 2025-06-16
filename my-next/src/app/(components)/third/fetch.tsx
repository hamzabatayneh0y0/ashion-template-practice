'use client';
import ThirdClient from "./client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcounter } from '@/store/slices/counter';
import { RootState, AppDispatch } from '@/store/store';
import Loading from "./loading";

export default  function Fetch() {
 const dispatch = useDispatch<AppDispatch>();
  const { data,loading } = useSelector((state: RootState) => state.counter);
  useEffect(() => {
   const promise= dispatch(fetchcounter());
  
   return () => {
      promise.abort(); // Abort the fetch request when the component unmounts

   }
  }, [dispatch]);
  return (
      <>
      {loading? <Loading/>:null}
      <ThirdClient title={String(data[0].name)} />
      </>
  )

}