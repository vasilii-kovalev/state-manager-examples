import {
	sleep,
} from "@/utilities/sleep";

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
	const [
		pageData,
	] = await Promise.all([
		Promise.resolve<PageData>(getPageDataFromLocalStorage()),
		// Adding a minimal artificial delay to display the full-page loader.
		sleep(PAGE_DATA_PROCESSING_DELAY),
	]);

	return pageData;
};

export {
	getPageData,
};
