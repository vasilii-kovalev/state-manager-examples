/*
	Custom properties are set on `style`. React's `CSSProperties` does not include a `--*` key.
	One index signature covers every custom property, so a call site does not assert.
*/
declare module "react" {
	interface CSSProperties {
		// Merging into `CSSProperties` needs an index signature. A `Record` would replace the interface.
		// oxlint-disable-next-line typescript/consistent-indexed-object-style
		[key: `--${string}`]: string | number | undefined;
	}
}

// Makes this file a module, so the `react` declaration augments the package instead of replacing it.
export {};
