import {
	sumBy,
} from "es-toolkit";

import {
	type CalendarDay,
} from "@/features/calendar/types";
import {
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type Worklog,
} from "@/features/worklog/types";

import {
	type ReportingStatisticsSummary,
} from "../types";
import {
	getReportedDuration,
} from "./get-reported-duration";

interface GetReportingStatisticsSummaryParams {
	worklogs: Array<Worklog>;
	calendar: Array<CalendarDay>;
}

const getReportingStatisticsSummary = ({
	worklogs,
	calendar,
}: GetReportingStatisticsSummaryParams): ReportingStatisticsSummary => {
	const reported = getReportedDuration(worklogs);
	const norm = sumBy(
		calendar,
		(worklog): Duration => {
			return worklog.norm;
		},
	);

	return {
		norm,
		reported,
	};
};

export {
	getReportingStatisticsSummary,
};
