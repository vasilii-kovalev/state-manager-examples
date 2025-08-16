import {
	isNull,
} from "es-toolkit";
import {
	null_,
	parse,
	union,
} from "valibot";

import {
	PAGE_DATA_LOCAL_STORAGE_KEY,
} from "../constants";
import {
	PageDataSchema,
} from "../schemas";
import {
	type PageData,
} from "../types";
import {
	getPageDataDefault,
} from "./get-page-data-default";

const getPageDataFromLocalStorage = (): PageData => {
	try {
		const pageDataFromLocalStorage = localStorage.getItem(PAGE_DATA_LOCAL_STORAGE_KEY);

		const pageData = parse(
			union([
				PageDataSchema,
				null_(),
			]),
			pageDataFromLocalStorage,
		);

		if (isNull(pageData)) {
			return getPageDataDefault();
		}

		return pageData;
	} catch (error) {
		console.error(error);

		return getPageDataDefault();
	}
};

export {
	getPageDataFromLocalStorage,
};
