import { defineConfig } from "vite-plus";

import { createReactAppConfig } from "../../packages/configs/vite.ts";

const config = defineConfig(
	createReactAppConfig({
		devPort: 5173,
	}),
);

export default config;
