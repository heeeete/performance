import { XMLParser } from "fast-xml-parser";
import type { LoaderFunctionArgs } from "react-router";

export const loader = async (args: LoaderFunctionArgs) => {
	const kopisKey = import.meta.env.VITE_OPEN_KEY;
	if (!kopisKey) {
		throw new Error("KOPIS_API_KEY is not set");
	}
	const id = args.params.id;

	const res = await fetch(
		`http://www.kopis.or.kr/openApi/restful/pblprfr/${id}?service=${kopisKey}`
	);

	const xmlText = await res.text();
	const parser = new XMLParser({
		ignoreAttributes: false,
		parseTagValue: true,
		trimValues: true,
	});

	const data = parser.parse(xmlText);

	return data.dbs.db ?? {};
};
