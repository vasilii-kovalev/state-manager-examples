import { type JSX } from "solid-js";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { useIsBusy } from "../hooks/use-is-busy";
import { overlay, overlayVisible } from "./full-page-loader.css";

const FullPageLoader = (): JSX.Element => {
	const isBusy = useIsBusy();

	return (
		<div
			class={buildClass(overlay, {
				[overlayVisible]: isBusy(),
			})}
		>
			Please, wait...
		</div>
	);
};

export { FullPageLoader };
