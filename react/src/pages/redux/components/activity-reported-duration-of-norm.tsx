import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type ActivityId,
} from "@/features/activity/types";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsSummaryForActivity,
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
	const reportingStatisticsSummary = useSelector((state: RootState) => {
		return selectReportingStatisticsSummaryForActivity(
			state.page,
			activityId,
		);
	});

	return (
		<ReportedDurationOfNorm
			location={`activity-info-cell-${activityId}`}
			norm={reportingStatisticsSummary.norm}
			reported={reportingStatisticsSummary.reported}
		/>
	);
};

export {
	ActivityReportedDurationOfNorm,
};
