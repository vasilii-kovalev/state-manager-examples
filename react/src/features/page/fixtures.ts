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
	getActivityName: (
		params: GetActivityNameParams,
	) => ActivityName;
	getGroupName: (
		groupIndex: number,
	) => GroupName;
	groupsCount: number;
	worklogDuration: Duration;
}

const getPageState = (
	params: GetPageStateParams,
): PageState => {
	const {
		activitiesPerGroupCount,
		getActivityName,
		getGroupName,
		groupsCount,
		worklogDuration,
	} = params;

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

			for (const calendarDay of calendar) {
				if (calendarDay.norm > 0) {
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

	const groups: Array<TreeGroup> = [];

	for (const groupId of groupIds) {
		const group = groupsById[groupId];

		if (isUndefined(group)) {
			continue;
		}

		const activities: Array<TreeActivity> = [];

		for (const activityId of activityIds) {
			const activity = activitiesById[activityId];

			if (
				isUndefined(activity)
				|| activity.groupId !== groupId
			) {
				continue;
			}

			const worklogs: Array<TreeWorklog> = [];

			for (const worklogId of worklogIds) {
				const worklog = worklogsById[worklogId];

				if (
					isUndefined(worklog)
					|| worklog.activityId !== activityId
				) {
					continue;
				}

				worklogs.push(
					omit(
						worklog,
						[
							"activityId",
							"groupId",
							"id",
						],
					),
				);
			}

			activities.push({
				...omit(
					activity,
					[
						"groupId",
						"id",
					],
				),
				worklogs,
			});
		}

		groups.push({
			...omit(
				group,
				[
					"id",
				],
			),
			activities,
		});
	}

	return {
		hasChanges,
		selectedWorklogIds,
		tree: groups,
	};
};

const targetGroupId: GroupId = "group-2";

type GetPageStateWithDifferentActivityNamesParams = Pick<
	GetPageStateParams,
	| "activitiesPerGroupCount"
	| "groupsCount"
	| "worklogDuration"
>;

const getPageStateWithDifferentActivityNames = (
	params: GetPageStateWithDifferentActivityNamesParams,
): PageState => {
	const {
		activitiesPerGroupCount,
		groupsCount,
		worklogDuration,
	} = params;

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
