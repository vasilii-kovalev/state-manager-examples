import {
	type FC,
	useEffect,
} from "react";
import {
	Provider,
	useDispatch,
} from "react-redux";

import {
	usePageData,
} from "@/hooks/use-page-data";

import {
	type Dispatch,
	store,
} from "./store";
import {
	resetState,
	setInitialState,
} from "./store/page/reducer";

const ReduxPage: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	usePageData({
		onSuccess: (pageData) => {
			dispatch(setInitialState(pageData));
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
		<h1>
			Redux page
		</h1>
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
