"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import "./client.scss"

// import { AppDispatch } from "@/store/store";
import {  useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
export default function ThirdClient({title}: { title: string| undefined }) {
  console.log("title", title);
  const router=useRouter();
    const [r, setr] = useState(title);
//  const dispatch = useDispatch<AppDispatch>();
    function handleClick() {
       setr("New Title");
      // dispatch({ type: 'counter/change' });
    }
    useEffect(() => {
        setr(title);
    }, [title]);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 bg-green-600">{r}</h1>
            {/* This button will not change the title as expected */}
     <Button onClick={()=>{
      handleClick();
      router.back()
     }} className="bg-blue-500 text-white px-4 py-2 rounded hover:animate-fade hover:bg-teal-500 font-arabic">
         اهلا
     </Button>
     <form onSubmit={(e)=>{
      e.preventDefault()
      console.log("ok")
     }}>
      <input type="text" />
     </form>
    </div>
  );
}