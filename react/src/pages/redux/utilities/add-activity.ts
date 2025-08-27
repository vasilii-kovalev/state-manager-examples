import {
	parse,
} from "valibot";

import {
	ActivitySchema,
} from "@/features/activity/schemas";
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

const addActivity = (groupId: GroupId): Thunk<void> => {
	return (dispatch) => {
		const existingNames = dispatch(
			getActivityNamesInGroup({
				groupId,
			}),
		);
		const name = getNewActivityName(existingNames);
		const activity = parse(
			ActivitySchema,
			getNewActivity({
				groupId,
				name,
			}),
		);

		dispatch(addActivityAction(activity));
	};
};

export {
	addActivity,
};
