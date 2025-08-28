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
