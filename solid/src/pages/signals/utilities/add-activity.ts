import {
	batch,
} from "solid-js";
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
	isUndefined,
} from "@/utilities/is-undefined";

import {
	setPageState,
} from "../signals/page/base";
import {
	selectActivityNamesInGroup,
} from "../signals/page/derived";

interface AddActivityParams {
	groupId: GroupId;
	name?: ActivityName;
}

const addActivity = (
	params: AddActivityParams,
): ActivityId => {
	const {
		groupId,
		name,
	} = params;

	let activityName = name;

	if (isUndefined(activityName)) {
		const existingNames = selectActivityNamesInGroup(groupId);

		activityName = getNewActivityName(existingNames);
	}

	const activity = parse(
		ActivitySchema,
		getNewActivity({
			groupId,
			name: activityName,
		}),
	);

	batch(() => {
		setPageState(
			"activitiesById",
			activity.id,
			activity,
		);

		setPageState(
			"activityIds",
			(
				activityIds,
			) => {
				return [
					activity.id,
					...activityIds,
				];
			},
		);

		setPageState(
			"hasChanges",
			true,
		);
	});

	return activity.id;
};

export {
	addActivity,
};
