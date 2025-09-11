import {
	isUndefined,
} from "es-toolkit";
import {
	parse,
} from "valibot";

import {
	ActivitySchema,
} from "@/features/activity/schemas";
import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type GroupId,
} from "@/features/group/types";
import {
	getNewActivity,
} from "@/features/page/utilities/get-new-activity";
import {
	getNewActivityName,
} from "@/features/page/utilities/get-new-activity-name";

import {
	type Thunk,
} from "../store";
import {
	addActivity as addActivityAction,
} from "../store/page/slice";
import {
	getActivityNamesInGroup,
} from "./get-activity-names-in-group";

interface AddActivityParams {
	groupId: GroupId;
	name?: ActivityName;
}

const addActivity = ({
	groupId,
	name,
}: AddActivityParams): Thunk<ActivityId> => {
	return (
		dispatch,
	) => {
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

export {
	addActivity,
};
