import { type FC, useEffect } from "react";
import { Provider } from "react-redux";

import { PAGE_STATE_DEFAULT } from "packages/shared/src/features/page/constants";
import { convertPageDataToPageState } from "packages/shared/src/features/page/utilities/convert-page-data-to-page-state";

import { FullPageLoader } from "../../components/full-page-loader";
import { usePageData } from "../../hooks/use-page-data";
import { PageActionsRow } from "./components/page-actions-row";
import { PageLeaveBlocker } from "./components/page-leave-blocker";
import { PageTitle } from "./components/page-title";
import { Table } from "./components/table";
import { tableOffset } from "./components/table.css";
import { store, useApplicationDispatch } from "./store";
import { resetState, setInitialState } from "./store/page/slice";

const ReduxPage: FC = () => {
	const dispatch = useApplicationDispatch();

	usePageData({
		onSuccess: (pageData) => {
			try {
				const pageState = convertPageDataToPageState(pageData);

				dispatch(setInitialState(pageState));
			} catch (error) {
				console.error(error);

				dispatch(setInitialState(PAGE_STATE_DEFAULT));
			}
		},
	});

	useEffect(() => {
		return (): void => {
			dispatch(resetState());
		};
	}, [dispatch]);

	return (
		<>
			<PageTitle />
			<PageActionsRow />

			<Table className={tableOffset} />

			<FullPageLoader />
			<PageLeaveBlocker />
		</>
	);
};

const ReduxPageWithContext: FC = () => {
	return (
		<Provider store={store}>
			<ReduxPage />
		</Provider>
	);
};

export { ReduxPageWithContext as ReduxPage };
