import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type GroupId,
} from "@/features/group/types";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";

import {
	type Thunk,
} from "../store";

interface GetGroupNamesParams {
	groupId: GroupId;
	activityIdToExclude?: ActivityId;
}

/*
	Can't use `selectActivityNamesInGroup` selector, because the result will be memoized,
	which is undesirable in this case.
*/
const getActivityNamesInGroup = ({
	groupId,
	activityIdToExclude,
}: GetGroupNamesParams): Thunk<Array<ActivityName>> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			activityIds,
			activitiesById,
		} = getState().page;

		const activities = getEntities({
			byId: activitiesById,
			filter: (activity) => {
				return (
					activity.groupId === groupId
					&& activity.id !== activityIdToExclude
				);
			},
			ids: activityIds,
		});

		return activities.map<ActivityName>((activity) => {
			return activity.name;
		});
	};
};

export {
	getActivityNamesInGroup,
};
