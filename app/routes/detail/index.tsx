import { useLoaderData } from "react-router";
import { Separator } from "~/components/ui/separator";
import type { PerformanceDetail } from "~/types/common";

import { loader as perfLoader } from "../apis/perf";
import PerfInfo from "./components/PerfInfo";

export const loader = perfLoader;

export default function Detail() {
    const data: PerformanceDetail = useLoaderData<typeof loader>();

    return (
        <article className="max-w-7xl mx-auto">
            <PerfInfo />
            <Separator className="my-10" />
            {/* 본문 이미지 */}
            {Array.isArray(data?.styurls?.styurl) ? (
                data?.styurls?.styurl.map((url) => (
                    <img
                        src={url}
                        alt={data?.prfnm}
                        className="w-3xl h-auto mx-auto"
                        loading="lazy"
                    />
                ))
            ) : (
                <img
                    src={data?.styurls?.styurl}
                    alt={data?.prfnm}
                    className="w-3xl h-auto mx-auto"
                    loading="lazy"
                />
            )}
        </article>
    );
}
