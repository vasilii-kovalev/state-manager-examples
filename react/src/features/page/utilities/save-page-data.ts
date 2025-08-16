import {
	PAGE_DATA_PROCESSING_DELAY,
} from "../constants";
import {
	type PageData,
} from "../types";
import {
	setPageDataToLocalStorage,
} from "./set-page-data-to-local-storage";

const savePageData = async (
	pageData: PageData,
): Promise<void> => {
	await new Promise<void>((resolve) => {
		setPageDataToLocalStorage(pageData);

		setTimeout(
			() => {
				resolve();
			},
			PAGE_DATA_PROCESSING_DELAY,
		);
	});
};

export {
	savePageData,
};
