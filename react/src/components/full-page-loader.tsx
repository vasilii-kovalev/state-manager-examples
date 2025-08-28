import {
	useIsFetching,
	useIsMutating,
} from "@tanstack/react-query";
import {
	type FC,
} from "react";

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
			className={`
				${
		css.loader
		}
				${
		isVisible
			? css.visible
			: ""
		}
			`}
		>
			Please, wait...
		</div>
	);
};

export {
	FullPageLoader,
};
