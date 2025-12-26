import { Suspense, useState } from "react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SkeletonPerfInfoCard from "~/components/SkeletonPerfInfoCard";
import { areaData, cateCode } from "~/constants/search-code";

import { FilterToggleGroup } from "./FilterToggleGroup";
import PopularPerfSwiper from "./PopularPerfSwiper";

export default function PopularPerf() {
    const [area, setArea] = useState<keyof typeof areaData | "ALL">("ALL");
    const [cate, setCate] = useState<keyof typeof cateCode | "ALL">("ALL");

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">현재 인기 순위</h2>
            <FilterToggleGroup title="지역" options={areaData} value={area} onChange={setArea} />
            <FilterToggleGroup title="장르" options={cateCode} value={cate} onChange={setCate} />
            <Suspense
                fallback={
                    <div className="grid grid-cols-3 gap-4 py-4">
                        <SkeletonPerfInfoCard count={9} />
                    </div>
                }
            >
                <PopularPerfSwiper area={area} cate={cate} />
            </Suspense>
        </div>
    );
}
