import { For, type JSX } from "solid-js";

import { type Activity } from "packages/shared/src/features/activity/types";
import { type GroupId } from "packages/shared/src/features/group/types";

import { selectActivitiesForGroup } from "../signals/page/derived";
import { ActivityRow } from "./activity-row";

interface ActivityRowsProps {
	groupId: GroupId;
}

const ActivityRows = (props: ActivityRowsProps): JSX.Element => {
	const activities = (): Array<Activity> => {
		return selectActivitiesForGroup(props.groupId);
	};

	return (
		<For each={activities()}>
			{(activity) => {
				return <ActivityRow activity={activity} />;
			}}
		</For>
	);
};

export { ActivityRows };
