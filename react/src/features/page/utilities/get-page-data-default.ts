import {
	type PageData,
} from "../types";
import {
	getCalendarForCurrentMonth,
} from "./get-calendar-for-current-month";

const getPageDataDefault = (): PageData => {
	return {
		activitiesById: {},
		calendar: getCalendarForCurrentMonth(),
		tasksById: {},
		worklogsById: {},
	};
};

export {
	getPageDataDefault,
};
