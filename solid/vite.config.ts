import {
	devtools,
} from "@tanstack/devtools-vite";
import {
	tanstackRouter,
} from "@tanstack/router-plugin/vite";
import solidDevtools from "solid-devtools/vite";
import sonda from "sonda/vite";
import unoCSS from "unocss/vite";
import {
	defineConfig,
} from "vite";
import solid from "vite-plugin-solid";

// https://vite.dev/config
const config = defineConfig({
	build: {
		// Required for Sonda.
		sourcemap: true,
	},
	plugins: [
		devtools(),
		solidDevtools(),
		tanstackRouter({
			autoCodeSplitting: true,
			target: "solid",
		}),
		unoCSS(),
		solid(),
		sonda(),
	],
	resolve: {
		tsconfigPaths: true,
	},
});

export default config;
