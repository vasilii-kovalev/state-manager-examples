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
	],
	shortcuts: {
		"bg-weekend": "bg-gray-100",
		cell: "p-2 b-1px b-solid h-6 min-w-12 text-center",
		control: "p-2 b-1px b-solid b-rd-2px min-w-6 min-h-6 font-size-4 box-border shrink-0",
		"icon-button": "aspect-square w-9",
		"info-column": "w-117 min-w-117",
	},
});

export default config;
