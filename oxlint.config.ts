import { defineConfig } from "oxlint";

const config = defineConfig({
	categories: {
		correctness: "error",
		pedantic: "error",
		perf: "error",
		restriction: "error",
		style: "error",
		suspicious: "error",
	},
	// TanStack Router regenerates this file. It is excluded from the formatter for the same reason.
	ignorePatterns: ["**/routeTree.gen.ts"],
	options: {
		typeAware: true,
		// Report TypeScript errors alongside lint diagnostics.
		typeCheck: true,
	},
	overrides: [
		{
			files: ["apps/react/**/*.tsx"],
			plugins: ["react"],
			rules: {
				// Note: to investigate
				"react/forbid-component-props": "off",
				// Components are arrows, the same form as callbacks and other functions.
				"react/function-component-definition": [
					"error",
					{
						namedComponents: "arrow-function",
						unnamedComponents: "arrow-function",
					},
				],
				"react/jsx-filename-extension": [
					"error",
					{
						extensions: [".tsx"],
					},
				],
				// The timesheet nests controls inside table cells.
				"react/jsx-max-depth": [
					"error",
					{
						max: 4,
					},
				],
				"react/jsx-no-literals": "off",
				// A host element can receive its own attributes through a spread. Custom components are still checked.
				"react/jsx-props-no-spreading": [
					"error",
					{
						html: "ignore",
					},
				],
				// A route file can keep a small function component next to the page component.
				"react/no-multi-comp": [
					"error",
					{
						ignoreStateless: true,
					},
				],
				// TanStack Router file routes export `Route`.
				"react/only-export-components": [
					"error",
					{
						allowExportNames: ["Route"],
					},
				],
				"react/react-in-jsx-scope": "off",
			},
		},
		{
			// Vite and the tool configs are loaded through a default export.
			files: ["**/*.config.mjs", "**/*.config.ts"],
			rules: {
				"import/no-default-export": "off",
			},
		},
		{
			// The shared Vite config runs in Node and needs its built-in modules.
			files: ["packages/configs/**/*.ts"],
			rules: {
				"import/no-nodejs-modules": "off",
			},
		},
		{
			// Note: to investigate
			files: ["**/*.ts", "**/*.tsx"],
			rules: {
				"eslint/init-declarations": "off",
				"eslint/max-lines": "off",
				"eslint/max-lines-per-function": "off",
				"eslint/max-statements": "off",
				"eslint/no-console": "off",
				"eslint/no-continue": "off",
				"eslint/no-ternary": "off",
				"eslint/no-undefined": "off",
				"typescript/no-dynamic-delete": "off",
				"typescript/no-unsafe-type-assertion": "off",
			},
		},
	],
	plugins: ["typescript", "import"],
	rules: {
		// Every arrow has a block body, so a short function has the same shape as a longer one.
		"eslint/arrow-body-style": ["error", "always"],
		"eslint/func-style": [
			"error",
			"expression",
			{
				allowArrowFunctions: true,
			},
		],
		"eslint/no-magic-numbers": [
			"error",
			{
				ignore: [-1, 0, 1],
			},
		],
		"eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		// Statement form is the explicit ignore for a floating promise.
		"eslint/no-void": [
			"error",
			{
				allowAsStatement: true,
			},
		],
		"eslint/one-var": "off",
		"eslint/prefer-arrow-callback": "error",
		/*
			Names inside an import use one case-insensitive order, so the list is easy to scan and a stray name stands out.
			Oxfmt orders the import statements. This rule orders the names inside each import.
		*/
		"eslint/sort-imports": [
			"error",
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
			},
		],
		// `type` is placed on the name. Every imported or exported symbol uses that same marking.
		"import/consistent-type-specifier-style": ["error", "prefer-inline"],
		"import/max-dependencies": "off",
		"import/no-named-export": "off",
		"import/no-relative-parent-imports": "off",
		// A stylesheet import exists for its side effect, so there is no binding to assign.
		"import/no-unassigned-import": [
			"error",
			{
				allow: ["**/*.css", "solid-devtools"],
			},
		],
		"import/prefer-default-export": "off",
		// To make the syntax consistent with other generics.
		"typescript/array-type": [
			"error",
			{
				default: "generic",
				readonly: "generic",
			},
		],
		"typescript/consistent-type-exports": [
			"error",
			{
				fixMixedExportsWithInlineTypeSpecifier: true,
			},
		],
		"typescript/consistent-type-imports": [
			"error",
			{
				fixStyle: "inline-type-imports",
				prefer: "type-imports",
			},
		],
		// A type-only name keeps that same inline `type`. The marking does not change with the other symbols.
		"typescript/no-import-type-side-effects": "off",
		// The extra annotations are noise relative to the bugs this rule would catch here.
		"typescript/prefer-readonly-parameter-types": "off",
		"typescript/prefer-reduce-type-parameter": "error",
	},
});

export default config;
