import {
	PAGE_DATA_PROCESSING_DELAY,
} from "../constants";
import {
	type PageData,
} from "../types";
import {
	getPageDataFromLocalStorage,
} from "./get-page-data-from-local-storage";
import {
	sleep,
} from "./sleep";

const getPageData = async (): Promise<PageData> => {
	const [
		pageData,
	] = await Promise.all([
		getPageDataFromLocalStorage(),
		// Adding a minimal artificial delay to display the full-page loader.
		sleep(PAGE_DATA_PROCESSING_DELAY),
	]);

	return pageData;
};

export {
	getPageData,
};
