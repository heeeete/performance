import { Suspense, useEffect, useRef, useState } from "react";
import { useGetJson } from "~/hooks/useGetJson";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Scrollbar, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Toggle } from "~/components/ui/toggle";
import { areaData, cateCode } from "~/constants/search-code";

import PerfInfoCard from "~/components/PerfInfoCard";
import SkeletonPerfInfoCard from "~/components/SkeletonPerfInfoCard";
import { lazy } from "react";

const LazyDotLottie = lazy(() => import("~/components/LazyDotLottie"));

export interface PerformanceItem {
	/** 장르/카테고리 (예: "무용(서양/한국무용)") */
	cate: string;
	/** 순번 (예: 20) */
	rnum: number;
	/** 공연명 (예: "유니버설발레단, 호두까기인형") */
	prfnm: string;
	/** 공연기간 (예: "2025.12.17~2025.12.28") */
	prfpd: string;
	/** 공연일수 (예: 18) */
	prfdtcnt: number;
	/** 지역 (예: "서울") */
	area: string;
	/** 공연장명 (예: "세종문화회관 세종대극장") */
	prfplcnm: string;
	/** 좌석 수 (예: 3022) */
	seatcnt: number;
	/** 포스터 이미지 URL */
	poster: string;
	/** 공연 식별 ID */
	mt20id: string;
}

function PopularPerfSwiper({
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
			className="!py-4"
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

export default function PopularPerf() {
	const [area, setArea] = useState<keyof typeof areaData | "ALL">("ALL");
	const [cate, setCate] = useState<keyof typeof cateCode | "ALL">("ALL");

	return (
		<div className="space-y-2">
			<h2 className="text-xl font-semibold">현재 인기 순위</h2>
			{/* 지역 필터링 */}
			<section>
				<h3>지역</h3>
				<div className="flex gap-2">
					{Object.keys(areaData).map((key) => (
						<Toggle
							variant={"outline"}
							key={key}
							pressed={area === key}
							onPressedChange={(pressed) => {
								setArea(pressed ? (key as keyof typeof areaData) : "ALL");
							}}
						>
							{areaData[key as keyof typeof areaData]}
						</Toggle>
					))}
				</div>
			</section>
			{/* 장르 필터링 */}

			<section>
				<h3>장르</h3>
				<div className="flex gap-2">
					{Object.keys(cateCode).map((key) => (
						<Toggle
							variant={"outline"}
							key={key}
							pressed={cate === key}
							onPressedChange={(pressed) => {
								setCate(pressed ? (key as keyof typeof cateCode) : "ALL");
							}}
						>
							{cateCode[key as keyof typeof cateCode]}
						</Toggle>
					))}
				</div>
			</section>
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
