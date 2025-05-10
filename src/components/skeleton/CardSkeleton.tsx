import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="w-full h-[300px]" />
      <Skeleton className="w-full" height={20} count={2} />
    </div>
  );
};

export default CardSkeleton;
