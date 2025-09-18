import {
	defineConfig,
	presetMini,
} from "unocss";

const config = defineConfig({
	presets: [
		presetMini(),
	],
	rules: [
		[
			"b-collapse",
			{
				"border-collapse": "collapse",
			},
		],
		[
			"inset-bs-0",
			{
				"inset-block-start": 0,
			},
		],
		[
			"list-none",
			{
				"list-style": "none",
			},
		],
	],
	shortcuts: {
		/*
			`!important` is required, because shortcuts have less specificity.
			If a higher specificity is set in the UnoCSS config in `layers`,
			the default classes won't be able to override shortcuts in other places.
			So this is a lesser evil.
		*/
		"bg-weekend": "!bg-gray-200",
		cell: "p-2 b-1px b-solid h-6 min-w-12 text-center",
		control: "p-2 b-1px b-solid b-rd-2px min-w-6 min-h-6 font-size-4 box-border shrink-0",
		"icon-button": "aspect-square w-9",
		"info-column": "w-123 min-w-123",
	},
});

export default config;
