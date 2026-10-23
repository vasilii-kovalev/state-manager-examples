import { type ReactNode } from "react";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { useIsBusy } from "../hooks/use-is-busy";
import { overlay, overlayVisible } from "./full-page-loader.css";

const FullPageLoader = (): ReactNode => {
	const isBusy = useIsBusy();

	return (
		<div
			className={buildClass(overlay, {
				[overlayVisible]: isBusy,
			})}
		>
			Please, wait...
		</div>
	);
};

export { FullPageLoader };
