import { XMLParser } from "fast-xml-parser";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export const loader = async ({ request }: { request: Request }) => {
	const { searchParams } = new URL(request.url);
	const stdate = searchParams.get("stdate") || dayjs().tz().subtract(2, "day").format("YYYYMMDD");
	const eddate = searchParams.get("eddate") || dayjs().tz().format("YYYYMMDD");
	const area = searchParams.get("area") || "ALL";
	const cate = searchParams.get("cate") || "ALL";

	let url = `http://kopis.or.kr/openApi/restful/boxoffice?service=${import.meta.env.VITE_OPEN_KEY}&stdate=${stdate}&eddate=${eddate}`;
	if (area !== "ALL") url += `&area=${area}`;
	if (cate !== "ALL") url += `&catecode=${cate}`;

	const res = await fetch(url);
	const xmlText = await res.text();

	const parser = new XMLParser({
		ignoreAttributes: false,
		parseTagValue: true,
		trimValues: true,
	});

	const data = parser.parse(xmlText);
	const list = data["boxofs"]?.boxof ?? [];

	const now = dayjs().tz();
	const midnight = now.endOf("day").add(1, "second");
	const secondsUntilMidnight = Math.max(0, midnight.diff(now, "second"));

	return new Response(JSON.stringify(list), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": `public, max-age=${secondsUntilMidnight}, s-maxage=${secondsUntilMidnight}, stale-while-revalidate=60`,
		},
	});
};
