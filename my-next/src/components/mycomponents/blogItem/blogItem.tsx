import Image, { StaticImageData } from "next/image";

export default function BlogItem({
  src,
  text,
  auth,
  date,
}: {
  src: StaticImageData;
  text: string;
  auth: string;
  date: string;
}) {
  return (
    <div className="blogitem m-3">
      <Image src={src} alt="blogitemimage" loading="lazy" className="w-full" />
      <div className="text bg-white w-4/5 p-4 -mt-20 relative">
        <h2 className="font-[500] sm:text-2xl">{text}</h2>
        <div className="info">
          <span className="text-gray-400">
            by <span className="text-gray-600">{auth}</span> |
          </span>
          <br />
          <span className="text-gray-400">{date}</span>
        </div>
      </div>
    </div>
  );
}
