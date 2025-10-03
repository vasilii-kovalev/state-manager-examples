import {
	type Component,
} from "solid-js";

import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import css from "./full-page-loader.module.css";

const FullPageLoader: Component = () => {
	const isBusy = useIsBusy();

	return (
		<div
			class={
				getClass([
					css.loader,
					// eslint-disable-next-line @stylistic/max-len
					"pos-fixed inset-0 hidden h-screen w-screen items-center justify-center bg-black bg-opacity-50 color-white opacity-0",
					[
						isBusy(),
						getClass([
							css.busy,
							"flex opacity-100",
						]),
					],
				])
			}
		>
			Please, wait...
		</div>
	);
};

export {
	FullPageLoader,
};
