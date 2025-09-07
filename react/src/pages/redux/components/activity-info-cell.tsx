import {
	type FC,
} from "react";

import {
	FlexRow,
} from "@/components/flex-row";
import {
	type Activity,
} from "@/features/activity/types";

import {
	ActivityNameInput,
} from "./activity-name-input";
import {
	ActivityReportedDurationOfNorm,
} from "./activity-reported-duration-of-norm";
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
	SelectActivityCheckbox,
} from "./select-activity-checkbox";

interface ActivityInfoCellProps {
	activity: Activity;
}

const ActivityInfoCell: FC<ActivityInfoCellProps> = ({
	activity,
}) => {
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

					<ActivityReportedDurationOfNorm
						activityId={activity.id}
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
