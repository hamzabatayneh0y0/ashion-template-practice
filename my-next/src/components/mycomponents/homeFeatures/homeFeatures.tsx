export default function HomeFeature({
  icon,
  title,
  discreption,
}: {
  icon: React.ReactNode;
  title: string;
  discreption: string;
}) {
  return (
    <div className="flex gap-5  grow flex-row items-center basis-full lg:basis-1/2 xl:basis-1/4  p-3 ">
      {icon}
      <div className="">
        <h4 className="font-[600] text-2xl">{title}</h4>
        <p className="text-gray-600 dark:text-gray-200">{discreption}</p>
      </div>
    </div>
  );
}
