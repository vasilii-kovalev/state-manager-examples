import { defineConfig } from "vite-plus";

/*
	Vitest projects do not inherit per-package `test` options from here; each workspace sets those in its own `vite.config.ts`.
	`packages/configs` is omitted: it holds shared helpers only and has no test files.
	`passWithNoTests` covers the Solid application and `packages/shared`, which have no test files yet.
*/
export default defineConfig({
	test: {
		passWithNoTests: true,
		projects: ["apps/*", "packages/shared"],
	},
});
