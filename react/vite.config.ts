import {
	tanstackRouter,
} from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import sonda from "sonda/vite";
import unoCSS from "unocss/vite";
import {
	defineConfig,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config
const config = defineConfig({
	build: {
		// Required for Sonda.
		sourcemap: true,
	},
	plugins: [
		tsconfigPaths({
			configNames: [
				"tsconfig.app.json",
			],
		}),
		tanstackRouter({
			autoCodeSplitting: true,
			target: "react",
		}),
		react(),
		unoCSS(),
		sonda(),
	],
});

export default config;
