import {
	PAGE_DATA_DEFAULT,
} from "../constants";
import {
	type PageData,
} from "../types";
import {
	getCalendarForMonth,
} from "./get-calendar-for-month";

const getPageDataDefault = (): PageData => {
	return {
		...PAGE_DATA_DEFAULT,
		calendar: getCalendarForMonth(new Date()),
	};
};

export {
	getPageDataDefault,
};
