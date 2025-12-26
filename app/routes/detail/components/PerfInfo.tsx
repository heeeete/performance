import { Info, SquareArrowOutUpRightIcon } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import type { PerformanceDetail } from "~/types/common";

import type { loader } from "..";
import Map from "./Map";

export default function PerfInfo() {
    const data: PerformanceDetail = useLoaderData<typeof loader>();

    return (
        <>
            <h2 className="text-2xl font-semibold">{data?.prfnm}</h2>
            <div className="grid grid-cols-2 gap-10">
                <img src={data?.poster} alt={data?.prfnm} className="w-full h-auto" />
                <div className="space-y-3">
                    <InfoRow label="장소" children={data?.fcltynm} />
                    <InfoRow label="공연기간" children={`${data?.prfpdfrom} ~ ${data?.prfpdto}`} />
                    <InfoRow label="공연시간" children={data?.prfruntime} />
                    <InfoRow label="관람연령" children={data?.prfage} />
                    <InfoRow
                        label="좌석가격"
                        children={data?.pcseguidance?.split(", ").map((relate, idx) => {
                            return <div key={idx}>{relate}</div>;
                        })}
                    />
                    <InfoRow
                        label="판매처"
                        children={
                            Array.isArray(data?.relates?.relate) ? (
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
                            )
                        }
                    />
                    <InfoRow label="주소" children={<Map />} />
                </div>
            </div>
        </>
    );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <dl className="grid col-span-6 grid-cols-6">
            <dt className="col-span-1">{label}</dt>
            <dd className="col-span-5">{children}</dd>
        </dl>
    );
}
