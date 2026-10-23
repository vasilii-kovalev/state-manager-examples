import { type JSX } from "solid-js";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { type Duration } from "packages/shared/src/features/dates-and-time/types";

import { selectReportedDurationForActivity } from "../signals/page/derived";
import { ReportedDurationOfNorm } from "./reported-duration-of-norm";

interface ActivityReportedDurationOfNormProps {
	activityId: ActivityId;
}

const ActivityReportedDurationOfNorm = (props: ActivityReportedDurationOfNormProps): JSX.Element => {
	const reportedDurationForActivity = (): Duration => {
		return selectReportedDurationForActivity(props.activityId);
	};

	return (
		<ReportedDurationOfNorm
			location={`activity-info-cell-${props.activityId}`}
			reported={reportedDurationForActivity()}
		/>
	);
};

export { ActivityReportedDurationOfNorm };
