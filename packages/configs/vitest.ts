import { type InlineConfig } from "vite-plus/test/node";

/*
	`*.test.ts` runs in Node. The applications have no component tests, so there is no browser project and no Playwright install.
	Benchmark files stay on Vitest's default `benchmark.include` and run through `vp test bench`.
*/
const createNodeTestConfig = (): InlineConfig => {
	return {
		globals: true,
		include: ["src/**/*.test.ts"],
	};
};

export { createNodeTestConfig };
