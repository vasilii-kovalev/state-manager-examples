import {
	type Accessor,
	type Component,
} from "solid-js";

import {
	type ActivityId,
} from "@/features/activity/types";
import {
	type Duration,
} from "@/features/dates-and-time/types";

import {
	selectReportedDurationForActivity,
} from "../signals/page/derived";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";

interface ActivityReportedDurationOfNormProps {
	activityId: ActivityId;
}

const ActivityReportedDurationOfNorm: Component<ActivityReportedDurationOfNormProps> = (
	props,
) => {
	const reportedDurationForActivity: Accessor<Duration> = () => {
		return selectReportedDurationForActivity(props.activityId);
	};

	return (
		<ReportedDurationOfNorm
			location={`activity-info-cell-${props.activityId}`}
			reported={reportedDurationForActivity()}
		/>
	);
};

export {
	ActivityReportedDurationOfNorm,
};
