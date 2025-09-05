import {
	useIsFetching,
	useIsMutating,
} from "@tanstack/react-query";
import {
	type FC,
} from "react";

import {
	getClass,
} from "@/utilities/get-class";

import css from "./full-page-loader.module.css";

const FullPageLoader: FC = () => {
	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	const isVisible = (
		isFetching > 0
		|| isMutating > 0
	);

	return (
		<div
			className={
				getClass([
					css.loader,
					// eslint-disable-next-line @stylistic/max-len
					"pos-absolute inset-0 hidden h-screen w-screen items-center justify-center bg-black bg-opacity-50 color-white opacity-0",
					[
						isVisible,
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
