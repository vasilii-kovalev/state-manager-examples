import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	FlexRow,
} from "@/components/flex-row";
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
	MoveWorklogsToActivityButton,
} from "./move-worklogs-to-activity-button";
import {
	RemoveActivityButton,
} from "./remove-activity-button";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";
import {
	SelectActivityCheckbox,
} from "./select-activity-checkbox";

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
		<Cell
			className="info-column"
		>
			<FlexRow
				className="justify-between gap-col-4"
			>
				<FlexRow
					className="gap-col-2"
				>
					<SelectActivityCheckbox
						activityId={activity.id}
					/>

					<ActivityNameInput
						activityId={activity.id}
						groupId={activity.groupId}
						name={activity.name}
					/>

					<ReportedDurationOfNorm
						location={`activity-info-cell-${activity.id}`}
						norm={reportingStatisticsSummary.norm}
						reported={reportingStatisticsSummary.reported}
					/>
				</FlexRow>

				<FlexRow
					className="gap-col-2"
				>
					<MoveWorklogsToActivityButton
						activityId={activity.id}
					/>

					<RemoveActivityButton
						activityId={activity.id}
					/>
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export {
	ActivityInfoCell,
};
