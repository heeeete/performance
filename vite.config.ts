import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import babel from "vite-plugin-babel";

const ReactCompilerConfig = {
	/* ... */
};

export default defineConfig(({ isSsrBuild }) => ({
	plugins: [
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
		// visualizer({
		// 	filename: isSsrBuild ? "./dist/visualizer-ssr.html" : "./dist/visualizer-client.html",
		// 	open: true,
		// 	brotliSize: true,
		// 	gzipSize: true,
		// }) as PluginOption,
		babel({
			filter: /\.[jt]sx?$/,
			babelConfig: {
				presets: ["@babel/preset-typescript"], // if you use TypeScript
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
			},
		}),
	],
	server: {
		proxy: {
			"/api/kopis": {
				target: "https://kopis.or.kr",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/kopis/, "/openApi/restful"),
			},
		},
	},
}));
