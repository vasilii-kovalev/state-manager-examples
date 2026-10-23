import { type ReactNode } from "react";

import { type GroupId } from "packages/shared/src/features/group/types";

import { useApplicationSelector } from "../store";
import { selectActivitiesForGroup } from "../store/page/selectors";
import { ActivityRow } from "./activity-row";

interface ActivityRowsProps {
	groupId: GroupId;
}

const ActivityRows = (props: ActivityRowsProps): ReactNode => {
	const { groupId } = props;

	const activities = useApplicationSelector((state) => {
		return selectActivitiesForGroup(state.page, groupId);
	});

	return (
		<>
			{activities.map((activity) => {
				return <ActivityRow activity={activity} key={activity.id} />;
			})}
		</>
	);
};

export { ActivityRows };
