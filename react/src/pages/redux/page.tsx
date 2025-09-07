import {
	type FC,
	Fragment,
	useEffect,
} from "react";
import {
	Provider,
	useDispatch,
} from "react-redux";

import {
	FullPageLoader,
} from "@/components/full-page-loader";
import {
	PAGE_STATE_DEFAULT,
} from "@/features/pages/constants";
import {
	convertPageDataToPageState,
} from "@/features/pages/utilities/convert-page-data-to-page-state";
import {
	usePageData,
} from "@/hooks/use-page-data";

import {
	PageActionsRow,
} from "./components/page-actions-row";
import {
	PageLeaveBlocker,
} from "./components/page-leave-blocker";
import {
	PageTitle,
} from "./components/page-title";
import {
	Table,
} from "./components/table";
import {
	type Dispatch,
	store,
} from "./store";
import {
	resetState,
	setInitialState,
} from "./store/page/slice";

const ReduxPage: FC = () => {
	const dispatch = useDispatch<Dispatch>();

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

	useEffect(
		() => {
			return () => {
				dispatch(resetState());
			};
		},
		[
			dispatch,
		],
	);

	return (
		<Fragment>
			<PageTitle/>
			<PageActionsRow/>

			<Table
				className="m-bs-4"
			/>

			<FullPageLoader/>
			<PageLeaveBlocker/>
		</Fragment>
	);
};

const ReduxPageWithContext: FC = () => {
	return (
		<Provider
			store={store}
		>
			<ReduxPage/>
		</Provider>
	);
};

export {
	ReduxPageWithContext as ReduxPage,
};
