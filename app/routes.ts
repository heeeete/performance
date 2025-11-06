import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	layout("routes/layouts/main.tsx", [
		index("routes/home/index.tsx"),
		route(":id", "routes/detail/index.tsx"),
		route("search/:keyword", "routes/search/index.tsx"),
	]),

	// * APIs
	...prefix("api", [
		route("popular-perf", "routes/apis/popular-perf.ts"),
		route("perf/:id", "routes/apis/perf.ts"),
		route("map/:id", "routes/apis/map.ts"),
		route("search/:keyword", "routes/apis/search.ts"),
	]),
] satisfies RouteConfig;
