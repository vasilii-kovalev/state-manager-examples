import {
	type FC,
} from "react";

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

const ActivityRow: FC<ActivityRowProps> = ({
	activity,
}) => {
	return (
		<Row>
			<ActivityInfoCell
				activity={activity}
			/>

			<WorklogCells
				activityId={activity.id}
				groupId={activity.groupId}
			/>
		</Row>
	);
};

export {
	ActivityRow,
};
