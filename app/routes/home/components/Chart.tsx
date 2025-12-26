import dayjs from "dayjs";
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useGetJson } from "~/hooks/useGetJson";
import type { PerformanceItem } from "~/types/common";

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
    const { data } = useGetJson<{ data: PerformanceItem[]; startDate: string; endDate: string }>({
        url: "/api/period-data",
        queryKey: ["period-data"],
        useSuspense: false,
    });

    return (
        <div>
            <h2 className="text-xl font-semibold">
                최근 7일 예매 통계 ({dayjs(data?.startDate).format("YYYY.MM.DD")} ~{" "}
                {dayjs(data?.endDate).format("YYYY.MM.DD")})
            </h2>
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
                <Area type="monotone" dataKey="prfdtcnt" fill="#51a2ff" stroke="#51a2ff" />
                <Bar dataKey="ntssnmrssm" barSize={"5%"} fill="#155dfc" className="text-blue-" />
                <Line type="monotone" dataKey="totnmrssm" stroke="#ff7300" />
                <Line type="monotone" dataKey="cancelnmrssm" stroke="red" />

                {/* <Bar barSize={10} dataKey="cancelnmrssm" stackId="a" fill="red" /> */}
                {/* <Bar barSize={10} dataKey="totnmrssm" stackId="a" fill="#82ca9d" /> */}
                {/* <Bar barSize={10} dataKey="ntssnmrssm" stackId="a" fill="#413ea0" /> */}
            </ComposedChart>
        </div>
    );
}
