import {
	convertPageStateToPageData,
} from "@/features/page/utilities/convert-page-state-to-page-data";
import {
	savePageData,
} from "@/features/page/utilities/save-page-data";

import {
	pageState,
} from "../signals/page/base";

const savePageState = async (): Promise<void> => {
	try {
		const pageData = convertPageStateToPageData(pageState);

		await savePageData(pageData);
	} catch (error) {
		console.error(error);
	}
};

export {
	savePageState,
};
