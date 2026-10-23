import { type ReactNode } from "react";

import { type Activity } from "packages/shared/src/features/activity/types";

import { FlexRow } from "../../../components/flex-row";
import { ActivityNameInput } from "./activity-name-input";
import { ActivityReportedDurationOfNorm } from "./activity-reported-duration-of-norm";
import { Cell } from "./cell";
import { infoColumn } from "./cell.css";
import { infoGroup, infoRow } from "./info-cell.css";
import { MoveWorklogsToActivityButton } from "./move-worklogs-to-activity-button";
import { RemoveActivityButton } from "./remove-activity-button";
import { SelectActivityCheckbox } from "./select-activity-checkbox";

interface ActivityInfoCellProps {
	activity: Activity;
}

const ActivityInfoCell = (props: ActivityInfoCellProps): ReactNode => {
	const { activity } = props;

	return (
		<Cell className={infoColumn}>
			<FlexRow className={infoRow}>
				<FlexRow className={infoGroup}>
					<SelectActivityCheckbox activityId={activity.id} />

					<ActivityNameInput activityId={activity.id} groupId={activity.groupId} name={activity.name} />

					<ActivityReportedDurationOfNorm activityId={activity.id} />
				</FlexRow>

				<FlexRow className={infoGroup}>
					<MoveWorklogsToActivityButton activityId={activity.id} />

					<RemoveActivityButton activityId={activity.id} />
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export { ActivityInfoCell };
