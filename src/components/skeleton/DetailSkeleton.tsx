import Skeleton from "react-loading-skeleton";
import CardSkeleton from "./CardSkeleton";

const DetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 max-w-[1512px] mx-auto">
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <Skeleton className="w-full h-[580px]" />
        </div>
        <div className="w-[40%]">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="w-full h-[110px]" />
            ))}
        </div>
      </div>
      <Skeleton className="w-full h-[80px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export default DetailSkeleton;
