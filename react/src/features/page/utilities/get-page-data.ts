import {
	PAGE_DATA_PROCESSING_DELAY,
} from "../constants";
import {
	type PageData,
} from "../types";
import {
	getPageDataFromLocalStorage,
} from "./get-page-data-from-local-storage";

const getPageData = async (): Promise<PageData> => {
	return await new Promise<PageData>((resolve) => {
		const pageData = getPageDataFromLocalStorage();

		setTimeout(
			() => {
				resolve(pageData);
			},
			PAGE_DATA_PROCESSING_DELAY,
		);
	});
};

export {
	getPageData,
};
