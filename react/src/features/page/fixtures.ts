import {
	cloneDeep,
} from "@/utilities/clone-deep";
import {
	isUndefined,
} from "@/utilities/is-undefined";
import {
	omit,
} from "@/utilities/omit";

import {
	type Activity,
	type ActivityName,
} from "../activity/types";
import {
	type Duration,
} from "../dates-and-time/types";
import {
	parseDate,
} from "../dates-and-time/utilities/parse-date";
import {
	type Group,
	type GroupId,
	type GroupName,
} from "../group/types";
import {
	type Worklog,
} from "../worklog/types";
import {
	PAGE_STATE_DEFAULT,
} from "./constants";
import {
	type PageState,
} from "./types";
import {
	getCalendarForMonth,
} from "./utilities/get-calendar-for-month";
import {
	getNewActivity,
} from "./utilities/get-new-activity";
import {
	getNewGroup,
} from "./utilities/get-new-group";
import {
	getNewWorklog,
} from "./utilities/get-new-worklog";

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
	groupsCount: number;
	worklogDuration: Duration;
}

const getPageState = ({
	activitiesPerGroupCount,
	getActivityName,
	getGroupName,
	groupsCount,
	worklogDuration,
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
			const activityId = `activity-${activityIndex + 1}-${groupId}`;
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
					if (!isUndefined(worklogDuration)) {
						const worklogId = `worklog-${calendarDay.date}-${activityId}`;
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

interface TreeGroup extends Omit<
	Group,
	| "id"
> {
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
				...omit(
					group,
					[
						"id",
					],
				),
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

type GetPageStateWithDifferentActivityNamesParams = Pick<
	GetPageStateParams,
	| "activitiesPerGroupCount"
	| "groupsCount"
	| "worklogDuration"
>;

const getPageStateWithDifferentActivityNames = ({
	activitiesPerGroupCount,
	groupsCount,
	worklogDuration,
}: GetPageStateWithDifferentActivityNamesParams): PageState => {
	const pageState = getPageState({
		activitiesPerGroupCount,
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
		groupsCount,
		worklogDuration,
	});

	pageState.selectedWorklogIds = pageState.worklogIds;

	return pageState;
};

const initialPageStateWithDifferentActivityNames = getPageStateWithDifferentActivityNames({
	activitiesPerGroupCount: 2,
	groupsCount: 2,
	worklogDuration: 8,
});

const pageStateWithDifferentActivityNamesForPerformance = getPageStateWithDifferentActivityNames({
	activitiesPerGroupCount: 2,
	groupsCount: 30,
	worklogDuration: 8,
});

const expectedPageStateWithDifferentActivityNames = getExpectedPageState(
	initialPageStateWithDifferentActivityNames,
);

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
	groupsCount: 2,
	worklogDuration: 8,
});

initialPageStateWithSameActivityNames.selectedWorklogIds = initialPageStateWithSameActivityNames.worklogIds;

export {
	expectedPageStateWithDifferentActivityNames,
	getExpectedPageState,
	initialPageStateWithDifferentActivityNames,
	initialPageStateWithSameActivityNames,
	pageStateWithDifferentActivityNamesForPerformance,
	targetGroupId,
};
