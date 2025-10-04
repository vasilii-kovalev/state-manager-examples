import {
	type Component,
	For,
} from "solid-js";

import {
	type Activity,
} from "@/features/activity/types";
import {
	type GroupId,
} from "@/features/group/types";

import {
	selectActivitiesForGroup,
} from "../signals/page/derived";
import {
	ActivityRow,
} from "./activity-row";

interface ActivityRowsProps {
	groupId: GroupId;
}

const ActivityRows: Component<ActivityRowsProps> = (
	props,
) => {
	const activities = (): Array<Activity> => {
		return selectActivitiesForGroup(props.groupId);
	};

	return (
		<For
			each={activities()}
		>
			{
				(
					activity,
				) => {
					return (
						<ActivityRow
							activity={activity}
						/>
					);
				}
			}
		</For>
	);
};

export {
	ActivityRows,
};
