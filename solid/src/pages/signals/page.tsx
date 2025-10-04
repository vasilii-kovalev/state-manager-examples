import {
	type Component,
	onCleanup,
} from "solid-js";

import {
	FullPageLoader,
} from "@/components/full-page-loader";
import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	convertPageDataToPageState,
} from "@/features/page/utilities/convert-page-data-to-page-state";
import {
	usePageData,
} from "@/hooks/use-page-data";
import {
	cloneDeep,
} from "@/utilities/clone-deep";

import {
	PageActionsRow,
} from "./components/page-actions-row";
import {
	PageTitle,
} from "./components/page-title";
import {
	Table,
} from "./components/table";
import {
	resetState,
} from "./utilities/reset-state";
import {
	setInitialState,
} from "./utilities/set-initial-state";

const SignalsPage: Component = () => {
	usePageData({
		onSuccess: (
			pageData,
		) => {
			try {
				const pageState = convertPageDataToPageState(pageData);

				setInitialState(pageState);
			} catch (error) {
				console.error(error);

				setInitialState(cloneDeep(PAGE_STATE_DEFAULT));
			}
		},
	});

	onCleanup(() => {
		resetState();
	});

	return (
		<>
			<PageTitle/>
			<PageActionsRow/>

			<Table
				class="m-bs-4"
			/>

			<FullPageLoader/>
			{/* PageLeaveBlocker */}
		</>
	);
};

export {
	SignalsPage,
};
