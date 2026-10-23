import { type ReactNode } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { useIsBusy } from "../hooks/use-is-busy";
import { overlay, overlayVisible } from "./full-page-loader.css";

const FullPageLoader = (): ReactNode => {
	const isBusy = useIsBusy();

	return <div className={getClass([overlay, [isBusy, overlayVisible]])}>Please, wait...</div>;
};

export { FullPageLoader };
