import {
	type DateString,
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type Worklog,
} from "@/features/worklog/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";
import {
	mapValues,
} from "@/utilities/map-values";

import {
	getReportedDuration,
} from "./get-reported-duration";

const getReportedDurationByDate = (
	worklogs: Array<Worklog>,
): Partial<Record<DateString, Duration>> => {
	const worklogsByDate = Object.groupBy(
		worklogs,
		(worklog) => {
			return worklog.date;
		},
	);

	return mapValues(
		worklogsByDate,
		(
			worklogsForDate,
		): Duration => {
			if (isUndefined(worklogsForDate)) {
				return 0;
			}

			return getReportedDuration(worklogsForDate);
		},
	);
};

export {
	getReportedDurationByDate,
};
