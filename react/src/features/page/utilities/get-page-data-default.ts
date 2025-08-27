import {
	type PageData,
} from "../types";
import {
	getCalendarForCurrentMonth,
} from "./get-calendar-for-current-month";

const getPageDataDefault = (): PageData => {
	return {
		activities: [],
		calendar: getCalendarForCurrentMonth(),
		groups: [],
		worklogs: [],
	};
};

export {
	getPageDataDefault,
};
