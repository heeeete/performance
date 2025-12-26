import { Link } from "react-router";
import { type SearchPerformance } from "~/routes/search/index";
import type { PerformanceItem } from "~/types/common";

import LazyImg from "./LazyImg";

export default function PerfInfoCard({
    data,
    useRanking = false,
}: {
    data: PerformanceItem | SearchPerformance;
    useRanking?: boolean;
}) {
    if (!("rnum" in data)) {
        return (
            <Link
                to={`/${data.mt20id}`}
                className="border rounded-lg flex p-2 gap-2 border-gray-300 relative"
            >
                <LazyImg
                    src={data.poster}
                    alt={data.prfnm}
                    className="aspect-[3/4] w-[124px] object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 justify-center flex flex-col gap-2">
                    <p className="text-xs text-gray-500">{data.prfstate}</p>
                    <p className="text-blue-600 font-bold">
                        {data.prfpdfrom} ~ {data.prfpdto}
                    </p>
                    <p className="font-semibold text-sm">{data.prfnm}</p>
                    <p className="text-xs text-gray-500">{data.fcltynm}</p>
                </div>
            </Link>
        );
    }
    return (
        <Link
            to={`/${data.mt20id}`}
            className="border rounded-lg flex p-2 gap-2 border-gray-300 relative"
        >
            {useRanking && data.rnum < 7 && (
                <div className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white rounded-full aspect-square w-8 flex items-center justify-center">
                    {data.rnum}
                </div>
            )}
            <LazyImg
                src={data.poster}
                alt={data.prfnm}
                className="aspect-[3/4] w-[124px] object-cover rounded-lg shrink-0"
            />
            <div className="flex-1 justify-center flex flex-col gap-2">
                <p className="text-blue-600 font-bold">{data.prfpd}</p>
                <p className="font-semibold text-sm">{data.prfnm}</p>
                {/* <p className="text-xs text-gray-500">{data.area}</p> */}
                <p className="text-xs text-gray-500">{data.prfplcnm}</p>
            </div>
        </Link>
    );
}
