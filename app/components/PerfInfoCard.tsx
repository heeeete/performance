import type { PerformanceItem } from "~/routes/home/components/PopularPerf";
import { Link } from "react-router";

export default function PerfInfoCard({
	data,
	useRanking = false,
}: {
	data: PerformanceItem;
	useRanking?: boolean;
}) {
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
			<img
				src={data.poster}
				alt={data.prfnm}
				className="aspect-[3/4] w-[124px] object-cover rounded-lg shrink-0"
				loading="lazy"
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
