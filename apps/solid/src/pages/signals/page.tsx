import { type Component, onCleanup } from "solid-js";

import { PAGE_STATE_DEFAULT } from "packages/shared/src/features/page/constants";
import { convertPageDataToPageState } from "packages/shared/src/features/page/utilities/convert-page-data-to-page-state";
import { cloneDeep } from "packages/shared/src/utilities/clone-deep";

import { FullPageLoader } from "../../components/full-page-loader";
import { usePageData } from "../../hooks/use-page-data";
import { PageActionsRow } from "./components/page-actions-row";
import { PageLeaveBlocker } from "./components/page-leave-blocker";
import { PageTitle } from "./components/page-title";
import { Table } from "./components/table";
import { tableOffset } from "./components/table.css";
import { resetState } from "./utilities/reset-state";
import { setInitialState } from "./utilities/set-initial-state";

const SignalsPage: Component = () => {
	usePageData({
		onSuccess: (pageData) => {
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
			<PageTitle />
			<PageActionsRow />

			<Table class={tableOffset} />

			<FullPageLoader />
			<PageLeaveBlocker />
		</>
	);
};

export { SignalsPage };
