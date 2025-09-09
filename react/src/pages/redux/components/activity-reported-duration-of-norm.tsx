import {
	type FC,
} from "react";

import {
	type ActivityId,
} from "@/features/activity/types";

import {
	useApplicationSelector,
} from "../store";
import {
	selectReportedDurationForActivity,
} from "../store/page/selectors";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";

interface ActivityReportedDurationOfNormProps {
	activityId: ActivityId;
}

const ActivityReportedDurationOfNorm: FC<ActivityReportedDurationOfNormProps> = ({
	activityId,
}) => {
	const reportedDurationForActivity = useApplicationSelector((state) => {
		return selectReportedDurationForActivity(
			state.page,
			activityId,
		);
	});

	return (
		<ReportedDurationOfNorm
			location={`activity-info-cell-${activityId}`}
			reported={reportedDurationForActivity}
		/>
	);
};

export {
	ActivityReportedDurationOfNorm,
};
