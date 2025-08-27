import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type Activity,
} from "@/features/activity/types";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsSummaryForActivity,
} from "../store/page/selectors";
import {
	ActivityNameInput,
} from "./activity-name-input";
import {
	Cell,
} from "./cell";
import {
	RemoveActivityButton,
} from "./remove-activity-button";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";

interface ActivityInfoCellProps {
	activity: Activity;
}

const ActivityInfoCell: FC<ActivityInfoCellProps> = ({
	activity,
}) => {
	const reportingStatisticsSummary = useSelector((state: RootState) => {
		return selectReportingStatisticsSummaryForActivity(
			state.page,
			activity.id,
		);
	});

	return (
		<Cell>
			<ActivityNameInput
				activityId={activity.id}
				groupId={activity.groupId}
				name={activity.name}
			/>

			<ReportedDurationOfNorm
				norm={reportingStatisticsSummary.norm}
				reported={reportingStatisticsSummary.reported}
			/>

			<RemoveActivityButton
				activityId={activity.id}
			/>
		</Cell>
	);
};

export {
	ActivityInfoCell,
};
