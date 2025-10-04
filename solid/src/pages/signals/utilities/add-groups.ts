import {
	batch,
} from "solid-js";

import {
	getNewWorklog,
} from "@/features/page/utilities/get-new-worklog";

import {
	selectCalendar,
} from "../signals/page/derived";
import {
	addActivity,
} from "./add-activity";
import {
	addGroup,
} from "./add-group";
import {
	addWorklog,
} from "./add-worklog";

interface AddGroupsParams {
	activitiesPerGroupCount: number;
	groupsCount: number;
	worklogDuration: number;
}

const addGroups = (
	params: AddGroupsParams,
): void => {
	const {
		activitiesPerGroupCount,
		groupsCount,
		worklogDuration,
	} = params;

	const calendar = selectCalendar();

	for (
		let groupIndex = 0;
		groupIndex < groupsCount;
		groupIndex += 1
	) {
		const groupId = addGroup({
			name: `Group ${groupIndex + 1}`,
		});

		for (
			let activityIndex = 0;
			activityIndex < activitiesPerGroupCount;
			activityIndex += 1
		) {
			const activityId = addActivity({
				groupId,
				name: `Activity ${groupIndex + 1}.${activityIndex + 1}`,
			});

			for (const calendarDay of calendar) {
				if (calendarDay.norm > 0) {
					const worklog = getNewWorklog({
						activityId,
						date: calendarDay.date,
						duration: worklogDuration,
						groupId,
					});

					addWorklog(worklog);
				}
			}
		}
	}
};

const addGroupsBatch: typeof addGroups = (
	...params
) => {
	batch(() => {
		addGroups(...params);
	});
};

export {
	addGroupsBatch as addGroups,
};
