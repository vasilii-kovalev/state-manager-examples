import { type ReactNode } from "react";

import { type Activity } from "packages/shared/src/features/activity/types";

import { ActivityInfoCell } from "./activity-info-cell";
import { Row } from "./row";
import { WorklogCells } from "./worklog-cells";

interface ActivityRowProps {
	activity: Activity;
}

const ActivityRow = (props: ActivityRowProps): ReactNode => {
	const { activity } = props;

	return (
		<Row>
			<ActivityInfoCell activity={activity} />

			<WorklogCells activityId={activity.id} groupId={activity.groupId} />
		</Row>
	);
};

export { ActivityRow };
