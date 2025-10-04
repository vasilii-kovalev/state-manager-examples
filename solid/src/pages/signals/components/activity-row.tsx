import {
	type Component,
} from "solid-js";

import {
	type Activity,
} from "@/features/activity/types";

import {
	ActivityInfoCell,
} from "./activity-info-cell";
import {
	Row,
} from "./row";
import {
	WorklogCells,
} from "./worklog-cells";

interface ActivityRowProps {
	activity: Activity;
}

const ActivityRow: Component<ActivityRowProps> = (
	props,
) => {
	return (
		<Row>
			<ActivityInfoCell
				activity={props.activity}
			/>

			<WorklogCells
				activityId={props.activity.id}
				groupId={props.activity.groupId}
			/>
		</Row>
	);
};

export {
	ActivityRow,
};
