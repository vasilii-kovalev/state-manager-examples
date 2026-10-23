import { type Component } from "solid-js";

import { getClass } from "packages/shared/src/utilities/get-class";

import { useIsBusy } from "../hooks/use-is-busy";
import { overlay, overlayVisible } from "./full-page-loader.css";

const FullPageLoader: Component = () => {
	const isBusy = useIsBusy();

	return <div class={getClass([overlay, [isBusy(), overlayVisible]])}>Please, wait...</div>;
};

export { FullPageLoader };
