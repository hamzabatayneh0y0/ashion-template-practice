"use client";

import Money from "@/components/mycomponents/currency/money";
import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import { useEffect, useState } from "react";

export default function Quantity({
  id,
  price,
  quantity,
}: {
  id: number;
  price: number;
  quantity: number;
}) {
  const [q, setQ] = useState(1);
  const { dispatch } = useUser();

  function handleAdd() {
    setQ((prv) => {
      return prv + 1;
    });
  }

  function handleabstract() {
    setQ((prv) => Math.max(1, prv - 1));
  }
  useEffect(() => {
    setQ(quantity);
  }, [quantity]);

  useEffect(() => {
    dispatch({
      type: "update",
      payload: {
        id: id,
        quantity: q,
      },
    });
  }, [q, dispatch, id]);

  return (
    <>
      <td className="p-3">
        <span className="border-1 border-gray-100 hover:border-red-500 rounded-full inline-flex justify-between py-2 px-5 ">
          <span
            className="w-12 cursor-pointer text-center select-none hover:text-red-500"
            onClick={() => {
              handleabstract();
            }}
          >
            -
          </span>
          {q}
          <span
            className="w-12 cursor-pointer text-center select-none hover:text-red-500"
            onClick={() => {
              handleAdd();
            }}
          >
            +
          </span>
        </span>
      </td>
      <td className="md:p-5 font-bold md:text-2xl text-center">
        <Money m={q * price} />
      </td>
    </>
  );
}
