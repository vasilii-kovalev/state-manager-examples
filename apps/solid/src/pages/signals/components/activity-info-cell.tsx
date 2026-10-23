import { type JSX } from "solid-js";

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

const ActivityInfoCell = (props: ActivityInfoCellProps): JSX.Element => {
	return (
		<Cell class={infoColumn}>
			<FlexRow class={infoRow}>
				<FlexRow class={infoGroup}>
					<SelectActivityCheckbox activityId={props.activity.id} />

					<ActivityNameInput
						activityId={props.activity.id}
						groupId={props.activity.groupId}
						name={props.activity.name}
					/>

					<ActivityReportedDurationOfNorm activityId={props.activity.id} />
				</FlexRow>

				<FlexRow class={infoGroup}>
					<MoveWorklogsToActivityButton activityId={props.activity.id} />

					<RemoveActivityButton activityId={props.activity.id} />
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export { ActivityInfoCell };
