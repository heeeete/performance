import { Link, useLoaderData, useParams, type LoaderFunctionArgs } from "react-router";
import { useGetJson } from "~/hooks/useGetJson";
import { loader as perfLoader } from "../apis/perf";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import PerfInfo from "./components/PerfInfo";
import Map from "./components/Map";
import { Separator } from "~/components/ui/separator";

export interface PerformanceDetail {
	mt20id: string; // 공연 ID
	prfnm: string; // 공연명
	prfpdfrom: string; // 공연 시작일 (YYYY.MM.DD)
	prfpdto: string; // 공연 종료일 (YYYY.MM.DD)
	fcltynm: string; // 공연장명
	prfcast: string; // 출연진
	prfcrew: string; // 스태프
	prfruntime: string; // 공연시간
	prfage: string; // 관람등급
	entrpsnm: string; // 제작사
	entrpsnmP: string; // 주최
	entrpsnmA: string; // 주관
	entrpsnmH: string; // 후원
	entrpsnmS: string; // 기획/제작사 등 기타
	pcseguidance: string; // 티켓 가격 안내
	poster: string; // 포스터 이미지 URL
	sty: string; // 소개/내용
	area: string; // 지역
	genrenm: string; // 장르
	openrun: "Y" | "N"; // 오픈런 여부
	visit: "Y" | "N"; // 방문 가능 여부
	child: "Y" | "N"; // 아동 공연 여부
	daehakro: "Y" | "N"; // 대학로 공연 여부
	festival: "Y" | "N"; // 축제 여부
	musicallicense: "Y" | "N"; // 라이선스 뮤지컬 여부
	musicalcreate: "Y" | "N"; // 창작 뮤지컬 여부
	updatedate: string; // 정보 갱신일 (YYYY-MM-DD HH:mm:ss)
	prfstate: string; // 공연 상태 (예: 공연중, 공연예정, 공연종료)
	mt10id: string; // 공연장 ID
	dtguidance: string; // 공연 일정 안내
	styurls?: {
		// 공연 소개 이미지 URL 정보
		styurl: string | string[]; // 단일 또는 배열 형태일 수 있음 (KOPIS API 특성상)
	};
	relates?: {
		// 관련 링크 정보
		relate: RelateItem[] | RelateItem; // 단일 객체 또는 배열 형태일 수 있음
	};
}

export interface RelateItem {
	relatenm: string; // 관련 사이트명
	relateurl: string; // 관련 링크 URL
}

export const loader = perfLoader;

export default function Detail() {
	const data: PerformanceDetail = useLoaderData<typeof loader>();

	return (
		<div className="max-w-7xl mx-auto">
			<PerfInfo />
			<Separator className="my-10" />
			{Array.isArray(data?.styurls?.styurl) ? (
				data?.styurls?.styurl.map((url) => (
					<img src={url} alt={data?.prfnm} className="w-3xl h-auto mx-auto" loading="lazy" />
				))
			) : (
				<img
					src={data?.styurls?.styurl}
					alt={data?.prfnm}
					className="w-3xl h-auto mx-auto"
					loading="lazy"
				/>
			)}
		</div>
	);
}
