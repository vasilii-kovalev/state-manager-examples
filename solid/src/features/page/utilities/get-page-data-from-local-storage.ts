import {
	parse,
} from "valibot";

import {
	isNull,
} from "@/utilities/is-null";

import {
	PAGE_DATA_LOCAL_STORAGE_KEY,
} from "../constants";
import {
	PageDataStringifiedSchema,
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

		if (isNull(pageDataFromLocalStorage)) {
			return getPageDataDefault();
		}

		return parse(
			PageDataStringifiedSchema,
			pageDataFromLocalStorage,
		);
	} catch (error) {
		console.error(error);

		return getPageDataDefault();
	}
};

export {
	getPageDataFromLocalStorage,
};
