import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import solidDevtools from "solid-devtools/vite";
import sonda from "sonda/vite";
import { type PluginOption } from "vite";
import solid from "vite-plugin-solid";
import { type UserConfig } from "vite-plus";

import { createNodeTestConfig } from "./vitest.ts";

interface AppConfigParams {
	devPort: number;
}

/*
	Fresh plugin instances per config: plugins keep per-config state, and Vitest resolves every project in one process.
	WyW runs before the framework transform so it extracts Linaria templates from the original source.
*/
const createWyWPlugin = (): PluginOption => {
	return wyw({
		oxcOptions: {
			transform: {
				jsx: {
					// Evaluating a TSX module during extraction must not expect `React` in scope.
					runtime: "automatic",
				},
			},
		},
	});
};

const createSharedAppConfig = ({ devPort }: AppConfigParams): UserConfig => {
	return {
		build: {
			// Sonda reads the source map when it reports the bundle.
			sourcemap: true,
		},
		preview: {
			port: devPort,
		},
		resolve: {
			tsconfigPaths: true,
		},
		server: {
			port: devPort,
		},
		test: createNodeTestConfig(),
	};
};

const createReactAppConfig = ({ devPort }: AppConfigParams): UserConfig => {
	return {
		...createSharedAppConfig({
			devPort,
		}),
		plugins: [
			devtools(),
			// The router plugin has to run before the framework transform.
			tanstackRouter({
				autoCodeSplitting: true,
				target: "react",
			}),
			createWyWPlugin(),
			react({
				compiler: true,
			}),
			sonda(),
		],
	};
};

const createSolidAppConfig = ({ devPort }: AppConfigParams): UserConfig => {
	return {
		...createSharedAppConfig({
			devPort,
		}),
		plugins: [
			devtools(),
			solidDevtools(),
			tanstackRouter({
				autoCodeSplitting: true,
				target: "solid",
			}),
			createWyWPlugin(),
			solid(),
			sonda(),
		],
	};
};

// `packages/shared`: Node tests only. No framework plugins.
const createNodeWorkspaceConfig = (): UserConfig => {
	return {
		test: createNodeTestConfig(),
	};
};

export { createNodeWorkspaceConfig, createReactAppConfig, createSolidAppConfig };
