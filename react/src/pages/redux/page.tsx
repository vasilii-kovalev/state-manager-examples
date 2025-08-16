import {
	type FC,
} from "react";
import {
	Provider,
} from "react-redux";

import {
	store,
} from "./store";

const ReduxPage: FC = () => {
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
