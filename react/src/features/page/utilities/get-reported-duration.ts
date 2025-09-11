import {
	sumBy,
} from "es-toolkit";

import {
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type Worklog,
} from "@/features/worklog/types";

const getReportedDuration = (
	worklogs: Array<Worklog>,
): Duration => {
	return sumBy(
		worklogs,
		(worklog): Duration => {
			return worklog.duration;
		},
	);
};

export {
	getReportedDuration,
};
