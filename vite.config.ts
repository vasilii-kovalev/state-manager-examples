import { defineConfig } from "vite-plus";

import oxfmtConfig from "./oxfmt.config.ts";
import oxlintConfig from "./oxlint.config.ts";

const config = defineConfig({
	// `pack` is omitted because the internal packages are consumed as source.
	fmt: oxfmtConfig,
	lint: oxlintConfig,
	run: {
		tasks: {
			// A task and a `package.json` script cannot share a name, so the scripts call these by their own names.
			"cspell:check": "cspell . --quiet --no-show-suggestions && cspell-check-unused-words",
			"fmt:check": "vp fmt --check",
			"fmt:fix": "vp fmt",
			// `vp lint` type-checks app and test programs via each workspace `tsconfig.json` references and honors `.gitignore` via `--ignore-path`.
			"lint:check": "vp lint --ignore-path .gitignore",
			"lint:fix": "vp run lint:check --fix",
			"stylelint:check": 'stylelint "**/*.{css,css.ts}" --ignore-path .gitignore',
			"stylelint:fix": "vp run stylelint:check --fix",
		},
	},
});

export default config;
