import { type FC } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { useIsBusy } from "../hooks/use-is-busy";
import { overlay, overlayVisible } from "./full-page-loader.css";

const FullPageLoader: FC = () => {
	const isBusy = useIsBusy();

	return <div className={getClass([overlay, [isBusy, overlayVisible]])}>Please, wait...</div>;
};

export { FullPageLoader };
