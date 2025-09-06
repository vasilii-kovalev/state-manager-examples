import {
	type FC,
} from "react";

import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import css from "./full-page-loader.module.css";

const FullPageLoader: FC = () => {
	const isBusy = useIsBusy();

	return (
		<div
			className={
				getClass([
					css.loader,
					// eslint-disable-next-line @stylistic/max-len
					"pos-absolute inset-0 hidden h-screen w-screen items-center justify-center bg-black bg-opacity-50 color-white opacity-0",
					[
						isBusy,
						"flex opacity-100",
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
