import { useEffect, useRef } from "react";
import { lazy } from "react";

import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import { Autoplay, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PerfInfoCard from "~/components/PerfInfoCard";
import { areaData, cateCode } from "~/constants/search-code";
import { useGetJson } from "~/hooks/useGetJson";
import type { PerformanceItem } from "~/types/common";

const LazyDotLottie = lazy(() => import("~/components/LazyDotLottie"));

export default function PopularPerfSwiper({
    area,
    cate,
}: {
    area: keyof typeof areaData | "ALL";
    cate: keyof typeof cateCode | "ALL";
}) {
    const { data } = useGetJson<PerformanceItem[]>({
        url: `/api/popular-perf?area=${area}&cate=${cate}`,
        queryKey: ["popular-perf", area, cate],
    });

    const chunkedData =
        data && Array.isArray(data)
            ? data.reduce<PerformanceItem[][]>((acc, _, i) => {
                  if (i % 3 === 0) acc.push(data.slice(i, i + 3));
                  return acc;
              }, [])
            : [[data]];

    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(0, 0);
        }
    }, [area]);

    return (
        <Swiper
            onSwiper={(swiper) => {
                swiperRef.current = swiper;
                swiper.slideTo(0, 0);
            }}
            spaceBetween={20}
            className="py-4!"
            slidesPerView={3}
            modules={[Scrollbar, Autoplay]}
            scrollbar={{
                hide: true,
                draggable: true,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
        >
            {chunkedData &&
                chunkedData.length > 0 &&
                chunkedData.map((d, i) => (
                    <SwiperSlide key={i} className="h-auto space-y-4">
                        {d.map((d, j) => (
                            <PerfInfoCard key={j} data={d as PerformanceItem} useRanking={true} />
                        ))}
                    </SwiperSlide>
                ))}
            {data && data.length === 0 && (
                <div className="mx-auto w-fit">
                    <LazyDotLottie src="/lottie/sad.lottie" className="w-[300px] h-[300px]" />
                    <p className="text-center text-gray-400">검색 결과가 없습니다 🥲</p>
                </div>
            )}
        </Swiper>
    );
}
