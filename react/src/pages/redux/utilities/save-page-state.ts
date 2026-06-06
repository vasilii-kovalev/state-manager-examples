import {
	convertPageStateToPageData,
} from "@/features/page/utilities/convert-page-state-to-page-data";
import {
	savePageData,
} from "@/features/page/utilities/save-page-data";

import {
	type Thunk,
} from "../store";

const savePageState = (): Thunk<Promise<void>> => {
	return async (
		dispatch,
		getState,
		/*
			Redux action creators must return `(dispatch, getState) => …` from the factory.
			The rule flags this arrow function because it does not capture `savePageState` locals
			and could be moved to module scope, but that would break the thunk factory shape.
			No rule option exists for this pattern; tracked upstream:
			https://github.com/sindresorhus/eslint-plugin-unicorn/issues/596
			https://github.com/sindresorhus/eslint-plugin-unicorn/issues/931
			https://github.com/sindresorhus/eslint-plugin-unicorn/pull/2748
			https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1536
		*/
		// eslint-disable-next-line unicorn/consistent-function-scoping
	) => {
		const pageState = getState().page;

		try {
			const pageData = convertPageStateToPageData(pageState);

			await savePageData(pageData);
		} catch (error) {
			console.error(error);
		}
	};
};

export {
	savePageState,
};
