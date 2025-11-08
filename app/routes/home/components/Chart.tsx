import dayjs from "dayjs";
import {
	ComposedChart,
	Line,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Scatter,
} from "recharts";
import { useGetJson } from "~/hooks/useGetJson";

interface PerformanceData {
	prfdt: number | string; // 날짜 (예: 11.01) 또는 "합계"
	prfcnt: number; // 공연 수
	prfdtcnt: number; // 공연횟수
	cancelnmrssm: number; // 취소 인원 수 합계
	totnmrssm: number; // 총 예매 인원 수 합계
	ntssamountsm: number; // 총 매출액 합계
	ntssnmrssm: number; // 총 예매수 수
}

type PerformanceDataList = PerformanceData[];

// #endregion

const dataKeyToKorean: Record<string, string> = {
	prfdtcnt: "공연횟수",
	ntssnmrssm: "총 예매수",
	totnmrssm: "실제 예매수",
	prfcnt: "공연 수",
	cancelnmrssm: "취소 인원",
	ntssamountsm: "총 매출액",
	prfdt: "날짜",
};

export default function Chart() {
	const { data } = useGetJson<{ data: PerformanceDataList; startDate: string; endDate: string }>({
		url: "/api/period-data",
		queryKey: ["period-data"],
		useSuspense: false,
	});

	return (
		<div>
			<h3>
				최근 7일 통계 ({dayjs(data?.startDate).format("YYYY.MM.DD")} ~{" "}
				{dayjs(data?.endDate).format("YYYY.MM.DD")})
			</h3>
			<ComposedChart
				style={{
					width: "100%",
					maxHeight: "40vh",
					aspectRatio: 1.618,
				}}
				responsive
				data={data?.data ?? []}
				margin={{
					top: 20,
					right: 0,
					bottom: 0,
					left: 0,
				}}
			>
				<CartesianGrid stroke="#f5f5f5" />
				<XAxis dataKey="prfdt" name={dataKeyToKorean.prfdt} />
				<YAxis width="auto" tickFormatter={(value: number) => value.toLocaleString()} />
				<Tooltip
					formatter={(value: number, name: string) => [
						value.toLocaleString(),
						dataKeyToKorean[name] || name,
					]}
				/>
				<Legend formatter={(value: string) => dataKeyToKorean[value] || value} />
				<Area type="monotone" dataKey="prfdtcnt" fill="#8884d8" stroke="#8884d8" />
				<Bar dataKey="ntssnmrssm" barSize={"5%"} fill="#413ea0" />
				<Line type="monotone" dataKey="totnmrssm" stroke="#ff7300" />
				<Line type="monotone" dataKey="cancelnmrssm" stroke="red" />
			</ComposedChart>
		</div>
	);
}
