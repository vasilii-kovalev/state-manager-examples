import { parse } from "valibot";

import { ActivitySchema } from "packages/shared/src/features/activity/schemas";
import { type ActivityId, type ActivityName } from "packages/shared/src/features/activity/types";
import { type GroupId } from "packages/shared/src/features/group/types";
import { getNewActivity } from "packages/shared/src/features/page/utilities/get-new-activity";
import { getNewActivityName } from "packages/shared/src/features/page/utilities/get-new-activity-name";
import { isUndefined } from "packages/shared/src/utilities/is-undefined";

import { type Thunk } from "../store";
import { addActivity as addActivityAction } from "../store/page/slice";
import { getActivityNamesInGroup } from "./get-activity-names-in-group";

interface AddActivityParams {
	groupId: GroupId;
	name?: ActivityName;
}

const addActivity = (params: AddActivityParams): Thunk<ActivityId> => {
	return (dispatch) => {
		const { groupId, name } = params;

		let activityName = name;

		if (isUndefined(activityName)) {
			const existingNames = dispatch(
				getActivityNamesInGroup({
					groupId,
				}),
			);

			activityName = getNewActivityName(existingNames);
		}

		const activity = parse(
			ActivitySchema,
			getNewActivity({
				groupId,
				name: activityName,
			}),
		);

		dispatch(addActivityAction(activity));

		return activity.id;
	};
};

export { addActivity };
