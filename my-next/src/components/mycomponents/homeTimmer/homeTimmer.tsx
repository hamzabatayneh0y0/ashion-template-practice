"use client";

import moment from "moment";
import { useEffect, useState } from "react";

export default function HomeTimmer() {
  const [timer, setTimer] = useState<number[]>([]);
  const l = moment().add(1, "month");
  useEffect(() => {
    const t = setInterval(() => {
      const now = moment();
      const duration: moment.Duration = moment.duration(l.diff(now));
      setTimer([
        duration.days(),
        duration.hours(),
        duration.minutes(),
        duration.seconds(),
      ]);
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, [l]);

  return (
    <>
      {" "}
      <span className="text-2xl md:text-4xl font-[500] block">
        {timer[0]}
        <sub className="text-gray-400 text-[15px] md:text-[20px] p-1">Day</sub>
      </span>{" "}
      <span className="text-2xl md:text-4xl font-[500] block">
        {timer[1]}
        <sub className="text-gray-400 text-[15px] md:text-[20px] p-1">Hour</sub>
      </span>{" "}
      <span className="text-2xl md:text-4xl font-[500] block">
        {timer[2]}
        <sub className="text-gray-400 text-[15px] md:text-[20px]p-1">
          Minute
        </sub>
      </span>{" "}
      <span className="text-2xl md:text-4xl font-[500] block">
        {timer[3]}
        <sub className="text-gray-400 text-[15px] md:text-[20px]p-1">
          Second
        </sub>
      </span>
    </>
  );
}
