import {
	cloneDeep,
	isUndefined,
	omit,
} from "es-toolkit";

import {
	type Activity,
	type ActivityName,
} from "@/features/activity/types";
import {
	type Duration,
} from "@/features/dates-and-time/types";
import {
	parseDate,
} from "@/features/dates-and-time/utilities/parse-date";
import {
	type Group,
	type GroupId,
	type GroupName,
} from "@/features/group/types";
import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	type PageState,
} from "@/features/page/types";
import {
	getCalendarForMonth,
} from "@/features/page/utilities/get-calendar-for-month";
import {
	getNewActivity,
} from "@/features/page/utilities/get-new-activity";
import {
	getNewGroup,
} from "@/features/page/utilities/get-new-group";
import {
	getNewWorklog,
} from "@/features/page/utilities/get-new-worklog";
import {
	type Worklog,
} from "@/features/worklog/types";

const calendarDate = parseDate("2025-09-01");

const calendar = getCalendarForMonth(calendarDate);

interface GetActivityNameParams {
	groupIndex: number;
	activityIndex: number;
}

interface GetPageStateParams {
	activitiesPerGroupCount: number;
	getActivityName: (params: GetActivityNameParams) => ActivityName;
	getGroupName: (groupIndex: number) => GroupName;
	getWorklogDuration: (groupId: GroupId) => Duration | undefined;
	groupsCount: number;
}

const getPageState = ({
	activitiesPerGroupCount,
	getActivityName,
	getGroupName,
	getWorklogDuration,
	groupsCount,
}: GetPageStateParams): PageState => {
	const pageState = cloneDeep(PAGE_STATE_DEFAULT);

	pageState.calendar = calendar;

	for (
		let groupIndex = 0;
		groupIndex < groupsCount;
		groupIndex += 1
	) {
		const groupId = `group-${groupIndex + 1}`;
		const groupName = getGroupName(groupIndex);
		const group = getNewGroup({
			id: groupId,
			name: groupName,
		});

		pageState.groupsById[groupId] = group;

		pageState.groupIds.push(groupId);

		for (
			let activityIndex = 0;
			activityIndex < activitiesPerGroupCount;
			activityIndex += 1
		) {
			const activityId = `activity-${groupIndex + 1}-${activityIndex + 1}`;
			const activityName = getActivityName({
				activityIndex,
				groupIndex,
			});
			const activity = getNewActivity({
				groupId,
				id: activityId,
				name: activityName,
			});

			pageState.activitiesById[activityId] = activity;

			pageState.activityIds.push(activityId);

			calendar.forEach((calendarDay) => {
				if (calendarDay.norm > 0) {
					const worklogDuration = getWorklogDuration(groupId);

					if (!isUndefined(worklogDuration)) {
						const worklogId = `worklog-${activityId}-${calendarDay.date}`;
						const worklog = getNewWorklog({
							activityId,
							date: calendarDay.date,
							duration: worklogDuration,
							groupId,
							id: worklogId,
						});

						pageState.worklogsById[worklogId] = worklog;

						pageState.worklogIds.push(worklogId);
					}
				}
			});
		}
	}

	return pageState;
};

type TreeWorklog = Omit<
	Worklog,
	| "activityId"
	| "groupId"
	| "id"
>;

interface TreeActivity extends Omit<
	Activity,
	| "groupId"
	| "id"
> {
	worklogs: Array<TreeWorklog>;
}

interface TreeGroup extends Group {
	activities: Array<TreeActivity>;
}

interface ExpectedPageState extends Pick<
	PageState,
	| "hasChanges"
	| "selectedWorklogIds"
> {
	tree: Array<TreeGroup>;
}

// Ids are omitted to avoid randomness affect the tests.
const getExpectedPageState = (
	pageState: PageState,
): ExpectedPageState => {
	const {
		activitiesById,
		activityIds,
		groupIds,
		groupsById,
		hasChanges,
		selectedWorklogIds,
		worklogIds,
		worklogsById,
	} = pageState;

	const tree: Array<TreeGroup> = groupIds.reduce<Array<TreeGroup>>(
		(
			groupsCurrent,
			groupId,
		) => {
			const group = groupsById[groupId];

			if (isUndefined(group)) {
				return groupsCurrent;
			}

			const activities = activityIds.reduce<Array<TreeActivity>>(
				(
					activitiesCurrent,
					activityId,
				) => {
					const activity = activitiesById[activityId];

					if (
						isUndefined(activity)
						|| activity.groupId !== groupId
					) {
						return activitiesCurrent;
					}

					const worklogs = worklogIds.reduce<Array<TreeWorklog>>(
						(
							worklogsCurrent,
							worklogId,
						) => {
							const worklog = worklogsById[worklogId];

							if (
								isUndefined(worklog)
								|| worklog.activityId !== activityId
							) {
								return worklogsCurrent;
							}

							worklogsCurrent.push(
								omit(
									worklog,
									[
										"activityId",
										"groupId",
										"id",
									],
								),
							);

							return worklogsCurrent;
						},
						[],
					);

					activitiesCurrent.push({
						...omit(
							activity,
							[
								"groupId",
								"id",
							],
						),
						worklogs,
					});

					return activitiesCurrent;
				},
				[],
			);

			groupsCurrent.push({
				...group,
				activities,
			});

			return groupsCurrent;
		},
		[],
	);

	return {
		hasChanges,
		selectedWorklogIds,
		tree,
	};
};

const targetGroupId: GroupId = "group-2";

const initialPageStateWithDifferentActivityNames = getPageState({
	activitiesPerGroupCount: 2,
	getActivityName: ({
		groupIndex,
		activityIndex,
	}) => {
		return `Activity ${groupIndex + 1}.${activityIndex + 1}`;
	},
	getGroupName: (
		groupIndex,
	) => {
		return `Group ${groupIndex + 1}`;
	},
	getWorklogDuration: () => {
		return 8;
	},
	groupsCount: 2,
});

initialPageStateWithDifferentActivityNames.selectedWorklogIds = initialPageStateWithDifferentActivityNames.worklogIds;

const initialPageStateWithSameActivityNames = getPageState({
	activitiesPerGroupCount: 2,
	getActivityName: ({
		activityIndex,
	}) => {
		return `Activity ${activityIndex + 1}`;
	},
	getGroupName: (
		groupIndex,
	) => {
		return `Group ${groupIndex + 1}`;
	},
	getWorklogDuration: () => {
		return 8;
	},
	groupsCount: 2,
});

initialPageStateWithSameActivityNames.selectedWorklogIds = initialPageStateWithSameActivityNames.worklogIds;

export {
	getExpectedPageState,
	initialPageStateWithDifferentActivityNames,
	initialPageStateWithSameActivityNames,
	targetGroupId,
};
