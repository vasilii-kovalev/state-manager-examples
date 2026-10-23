import { defineConfig } from "vite-plus";

import { createSolidAppConfig } from "../../packages/configs/vite.ts";

const config = defineConfig(
	createSolidAppConfig({
		devPort: 5174,
	}),
);

export default config;
