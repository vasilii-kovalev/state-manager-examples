import {
	isUndefined,
} from "es-toolkit";

import {
	type CalendarDay,
} from "@/features/calendar/types";
import {
	type Worklog,
} from "@/features/worklog/types";

import {
	type ReportingStatisticsByDate,
	type ReportingStatisticsSummary,
} from "../types";
import {
	getReportedDuration,
} from "./get-reported-duration";

interface GetReportingStatisticsParams {
	worklogs: Array<Worklog>;
	calendar: Array<CalendarDay>;
}

const getReportingStatisticsByDate = ({
	worklogs,
	calendar,
}: GetReportingStatisticsParams): ReportingStatisticsByDate => {
	const worklogsByDate = Object.groupBy(
		worklogs,
		(worklog) => {
			return worklog.date;
		},
	);

	return calendar.reduce<ReportingStatisticsByDate>(
		(
			reportingStatisticsByDateCurrent,
			calendarDay,
		) => {
			const worklogsForDate = worklogsByDate[calendarDay.date];

			const reportingStatisticsForDate: ReportingStatisticsSummary = {
				norm: calendarDay.norm,
				reported: 0,
			};

			if (!isUndefined(worklogsForDate)) {
				reportingStatisticsForDate.reported = getReportedDuration(worklogsForDate);
			}

			// eslint-disable-next-line no-param-reassign
			reportingStatisticsByDateCurrent[calendarDay.date] = reportingStatisticsForDate;

			return reportingStatisticsByDateCurrent;
		},
		{},
	);
};

export {
	getReportingStatisticsByDate,
};
