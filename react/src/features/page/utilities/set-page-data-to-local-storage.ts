import {
	PAGE_DATA_LOCAL_STORAGE_KEY,
} from "../constants";
import {
	type PageData,
} from "../types";

const setPageDataToLocalStorage = (
	pageData: PageData,
): void => {
	try {
		localStorage.setItem(
			PAGE_DATA_LOCAL_STORAGE_KEY,
			JSON.stringify(pageData),
		);
	} catch (error) {
		console.error(error);
	}
};

export {
	setPageDataToLocalStorage,
};
