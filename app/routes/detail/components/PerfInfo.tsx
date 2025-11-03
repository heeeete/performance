import type { loader, PerformanceDetail } from "..";
import { Link, useLoaderData } from "react-router";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import Map from "./Map";

export default function PerfInfo() {
	const data: PerformanceDetail = useLoaderData<typeof loader>();

	console.log(data);

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">{data?.prfnm}</h2>
			</div>
			<div className="grid grid-cols-2 gap-10">
				<img src={data?.poster} alt={data?.prfnm} className="w-full h-auto" />
				<div className="space-y-3">
					<dl className="grid col-span-6 grid-cols-6 ">
						<dt className="col-span-1">장소</dt>
						<dd className="col-span-5">{data?.fcltynm}</dd>
					</dl>
					<dl className="grid col-span-6 grid-cols-6">
						<dt className="col-span-1">공연기간</dt>
						<dd className="col-span-5">
							{data?.prfpdfrom} ~ {data?.prfpdto}
						</dd>
					</dl>
					<dl className="grid col-span-6 grid-cols-6">
						<dt className="col-span-1">공연시간</dt>
						<dd className="col-span-5">{data?.prfruntime}</dd>
					</dl>
					<dl className="grid col-span-6 grid-cols-6">
						<dt className="col-span-1">관람연령</dt>
						<dd className="col-span-5">{data?.prfage}</dd>
					</dl>
					<dl className="grid col-span-6 grid-cols-6">
						<dt className="col-span-1">좌석가격</dt>
						<dd className="col-span-5">
							{data?.pcseguidance.split(", ").map((relate, idx) => {
								return <div key={idx}>{relate}</div>;
							})}
						</dd>
					</dl>
					<dl className="grid col-span-6 grid-cols-6">
						<dt className="col-span-1">판매처</dt>
						<dd className="col-span-5">
							{Array.isArray(data?.relates?.relate) ? (
								data?.relates?.relate?.map((relate) => (
									<Link
										key={relate.relateurl}
										to={relate.relateurl}
										target="_blank"
										className="flex gap-2 items-center hover:underline"
									>
										{relate.relatenm}
										<SquareArrowOutUpRightIcon className="w-4 h-4" />
									</Link>
								))
							) : (
								<Link
									key={data?.relates?.relate?.relateurl}
									to={data?.relates?.relate?.relateurl ?? ""}
									target="_blank"
									className="flex gap-2 items-center hover:underline"
								>
									{data?.relates?.relate?.relatenm}
									<SquareArrowOutUpRightIcon className="w-4 h-4" />
								</Link>
							)}
						</dd>
					</dl>
					<dl className="grid col-span-6 grid-cols-6">
						<dt className="col-span-1">주소</dt>
						<dd className="col-span-5">
							<Map />
						</dd>
					</dl>
				</div>
			</div>
		</>
	);
}
