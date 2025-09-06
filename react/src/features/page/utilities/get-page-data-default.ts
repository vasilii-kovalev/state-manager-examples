import {
	PAGE_DATA_DEFAULT,
} from "../constants";
import {
	type PageData,
} from "../types";
import {
	getCalendarForCurrentMonth,
} from "./get-calendar-for-current-month";

const getPageDataDefault = (): PageData => {
	return {
		...PAGE_DATA_DEFAULT,
		calendar: getCalendarForCurrentMonth(),
	};
};

export {
	getPageDataDefault,
};
