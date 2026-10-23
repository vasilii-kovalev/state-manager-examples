import { sumBy } from "../../../utilities/sum-by";
import { type Duration } from "../../dates-and-time/types";
import { type Worklog } from "../../worklog/types";

const getReportedDuration = (worklogs: Array<Worklog>): Duration => {
	return sumBy(worklogs, (worklog): Duration => {
		return worklog.duration;
	});
};

export { getReportedDuration };
