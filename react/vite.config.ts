import babel from "@rolldown/plugin-babel";
import {
	devtools,
} from "@tanstack/devtools-vite";
import {
	tanstackRouter,
} from "@tanstack/router-plugin/vite";
import react, {
	reactCompilerPreset,
} from "@vitejs/plugin-react";
import sonda from "sonda/vite";
import unoCSS from "unocss/vite";
import {
	defineConfig,
} from "vite";

// https://vite.dev/config
const config = defineConfig({
	build: {
		// Required for Sonda.
		sourcemap: true,
	},
	plugins: [
		devtools(),
		tanstackRouter({
			autoCodeSplitting: true,
			target: "react",
		}),
		react(),
		babel({
			presets: [
				reactCompilerPreset(),
			],
		}),
		unoCSS(),
		sonda(),
	],
	resolve: {
		tsconfigPaths: true,
	},
});

export default config;
