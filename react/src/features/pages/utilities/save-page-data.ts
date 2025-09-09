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
	setPageDataToLocalStorage,
} from "./set-page-data-to-local-storage";

const savePageData = async (
	pageData: PageData,
): Promise<void> => {
	await Promise.all([
		new Promise<void>((resolve) => {
			setPageDataToLocalStorage(pageData);

			resolve();
		}),
		// Adding a minimal artificial delay to display the full-page loader.
		sleep(PAGE_DATA_PROCESSING_DELAY),
	]);
};

export {
	savePageData,
};
