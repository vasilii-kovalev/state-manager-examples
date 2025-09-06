import {
	type DateString,
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type Worklog,
} from "@/features/worklog/types";

import {
	getReportedDuration,
} from "./get-reported-duration";

interface GetReportingStatisticsParams {
	worklogs: Array<Worklog>;
	date: DateString;
}

const getReportedDurationForDate = ({
	worklogs,
	date,
}: GetReportingStatisticsParams): Duration => {
	const worklogsForDate = worklogs.filter((worklog) => {
		return worklog.date === date;
	});

	return getReportedDuration(worklogsForDate);
};

export {
	getReportedDurationForDate,
};
