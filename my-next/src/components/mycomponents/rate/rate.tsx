export default function Rate({ rate }: { rate: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rate > i) {
      stars.push(
        <span
          key={i}
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
          className=" bg-gradient-to-r from-yellow-500 from-100% to-gray-200 to-100% text-transparent w-8 h-8"
        ></span>
      );
    } else {
      if (i - rate < 1) {
        const decimal = Math.round((rate % 1) * 100);
        stars.push(
          <span
            key={i}
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              backgroundImage: `linear-gradient(to right,#F0B100  ${decimal}% ,#E5E7EB ${decimal}%)`,
            }}
            className={` text-transparent w-8 h-8`}
          ></span>
        );
      } else {
        stars.push(
          <span
            key={i}
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
            className=" bg-gray-200 w-8 h-8"
          ></span>
        );
      }
    }
  }
  return (
    <div className="rate flex gap-1 w-fit">
      {stars.map((e) => {
        return e;
      })}
    </div>
  );
}
