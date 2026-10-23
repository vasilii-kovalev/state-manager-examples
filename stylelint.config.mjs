/** @type {import("stylelint").Config} */
const config = {
	extends: ["stylelint-config-standard"],
	ignoreFiles: [
		"**/*.ts",
		/*
		 * `**` matches only ordinary path segments. This pattern names a segment
		 * that starts with `.`, so a TypeScript file under a hidden directory is ignored.
		 */
		"**/.*/**/*.ts",
		"!**/*.css.ts",
		"**/normalize.css",
	],
	overrides: [
		{
			/*
			 * A Linaria `css` template is the body of the generated class, so its
			 * declarations sit on the PostCSS root. stylelint-order sorts that root
			 * only when the syntax marks it with `raws.isRuleLike`. This syntax does,
			 * and it keeps the newline after the opening backtick on the first
			 * declaration so autofix does not glue properties onto one line.
			 */
			customSyntax: "postcss-styled-syntax",
			files: ["**/*.css.ts"],
			rules: {
				// Linaria marks selectors that must stay unscoped with `:global`.
				"selector-pseudo-class-no-unknown": [
					true,
					{
						ignorePseudoClasses: ["global"],
					},
				],
			},
		},
	],
	plugins: ["stylelint-order"],
	rules: {
		"order/custom-properties-alphabetical-order": true,
		"order/order": ["custom-properties", "declarations", "at-rules", "rules"],
		"order/properties-alphabetical-order": true,
	},
};

export default config;
