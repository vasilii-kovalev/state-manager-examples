import {
	type Component,
} from "solid-js";

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

const ActivityInfoCell: Component<ActivityInfoCellProps> = (
	props,
) => {
	return (
		<Cell
			class="info-column"
		>
			<FlexRow
				class="justify-between gap-col-4"
			>
				<FlexRow
					class="gap-col-2"
				>
					<SelectActivityCheckbox
						activityId={props.activity.id}
					/>

					<ActivityNameInput
						activityId={props.activity.id}
						groupId={props.activity.groupId}
						name={props.activity.name}
					/>

					<ActivityReportedDurationOfNorm
						activityId={props.activity.id}
					/>
				</FlexRow>

				<FlexRow
					class="gap-col-2"
				>
					<MoveWorklogsToActivityButton
						activityId={props.activity.id}
					/>

					<RemoveActivityButton
						activityId={props.activity.id}
					/>
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export {
	ActivityInfoCell,
};
