import dayjs from "dayjs";
import { XMLParser } from "fast-xml-parser";
import type { LoaderFunctionArgs } from "react-router";

export const loader = async (args: LoaderFunctionArgs) => {
    const { keyword } = args.params;
    const { searchParams } = new URL(args.request.url);
    const page = searchParams.get("page") || "1";

    const now = dayjs().tz("Asia/Seoul").format("YYYYMMDD");
    const url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${import.meta.env.VITE_OPEN_KEY}&rows=20&shprfnm=${keyword}&stdate=19000101&eddate=${now}&cpage=${page}`;

    const res = await fetch(url);
    const xmlText = await res.text();

    const parser = new XMLParser({
        ignoreAttributes: false,
        parseTagValue: true,
        trimValues: true,
    });

    const data = parser.parse(xmlText);

    const items = Array.isArray(data.dbs.db) ? data.dbs.db : data.dbs.db ? [data.dbs.db] : [];

    const currentPage = Number(page);
    const itemsPerPage = 20;

    const hasNextPage = items.length === itemsPerPage;

    return {
        items,
        currentPage,
        hasNextPage,
    };
};
