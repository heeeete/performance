import dayjs from "dayjs";
import { XMLParser } from "fast-xml-parser";
import type { LoaderFunctionArgs } from "react-router";

export const loader = async (args: LoaderFunctionArgs) => {
    const kopisKey = import.meta.env.VITE_OPEN_KEY;
    if (!kopisKey) {
        throw new Error("KOPIS_API_KEY is not set");
    }
    const startDate = dayjs().tz("Asia/Seoul").subtract(8, "day").format("YYYYMMDD");
    const endDate = dayjs().tz("Asia/Seoul").subtract(2, "day").format("YYYYMMDD");

    const res = await fetch(
        `http://kopis.or.kr/openApi/restful/boxStats?service=${kopisKey}&stdate=${startDate}&eddate=${endDate}&ststype=dayWeek`
    );

    const xmlText = await res.text();
    const parser = new XMLParser({
        ignoreAttributes: false,
        parseTagValue: true,
        trimValues: true,
    });

    const data = parser.parse(xmlText);

    const now = dayjs().tz("Asia/Seoul");
    const midnight = now.endOf("day").add(1, "second");
    const secondsUntilMidnight = Math.max(0, midnight.diff(now, "second"));

    return new Response(
        JSON.stringify({
            data: data["box-statsofs"].boxStatsof?.slice(0, 7) ?? [],
            startDate,
            endDate,
        }),
        {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Cache-Control": `public, max-age=${secondsUntilMidnight}, s-maxage=${secondsUntilMidnight}, stale-while-revalidate=60`,
            },
        }
    );
};
