import { useLoaderData } from "react-router";
import type { loader, PerformanceDetail } from "..";
import { useGetJson } from "~/hooks/useGetJson";
import { useEffect } from "react";

export interface MapData {
	fcltynm: string; // 시설명
	mt10id: string; // 시설 ID
	mt13cnt: number; // 공연장(소속 공간) 개수
	fcltychartr: string; // 시설 성격 (예: 공공, 민간 등)
	opende: number | string; // 개관연도
	seatscale: number | string; // 총 좌석 수
	telno: string; // 전화번호
	relateurl: string; // 홈페이지 URL
	adres: string; // 주소
	la: number; // 위도 (latitude)
	lo: number; // 경도 (longitude)

	// 편의시설 (Y/N)
	restaurant: "Y" | "N";
	cafe: "Y" | "N";
	store: "Y" | "N";
	nolibang: "Y" | "N";
	suyu: "Y" | "N";

	// 장애인 편의시설 (Y/N)
	parkbarrier: "Y" | "N"; // 장애인 주차시설
	restbarrier: "Y" | "N"; // 장애인 화장실
	runwbarrier: "Y" | "N"; // 장애인 통로
	elevbarrier: "Y" | "N"; // 장애인 엘리베이터

	parkinglot: "Y" | "N"; // 주차장 여부
}

export default function Map() {
	const data: PerformanceDetail = useLoaderData<typeof loader>();
	const { data: mapData } = useGetJson<MapData>({
		url: `/api/map/${data?.mt10id}`,
		queryKey: ["map", data?.mt10id],
		useSuspense: false,
	});

	useEffect(() => {
		if ((window as any).naver && mapData) {
			const map = new (window as any).naver.maps.Map("map", {
				center: new (window as any).naver.maps.LatLng(mapData.la, mapData.lo),
			});
			const marker = new (window as any).naver.maps.Marker({
				position: new (window as any).naver.maps.LatLng(mapData.la, mapData.lo),
				map: map,
			});
		}
	}, [mapData]);
	return (
		<div>
			<p>{mapData?.adres}</p>
			<div id="map" className="w-full h-[400px]"></div>
		</div>
	);
}
