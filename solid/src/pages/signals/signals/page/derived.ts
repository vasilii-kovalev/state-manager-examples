import {
	type Activity,
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type DateString,
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type Group,
	type GroupId,
	type GroupName,
} from "@/features/group/types";
import {
	type EntitySelectionState,
	type PageState,
} from "@/features/page/types";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";
import {
	getEntitySelectionState,
} from "@/features/page/utilities/get-entity-selection-state";
import {
	getReportedDuration,
} from "@/features/page/utilities/get-reported-duration";
import {
	getReportedDurationByDate,
} from "@/features/page/utilities/get-reported-duration-by-date";
import {
	type Worklog,
} from "@/features/worklog/types";
import {
	isEmpty,
} from "@/utilities/is-empty";
import {
	isUndefined,
} from "@/utilities/is-undefined";
import {
	sumBy,
} from "@/utilities/sum-by";

import {
	pageState,
} from "./base";
import {
	ACTIVITIES_FALLBACK,
	DURATION_FALLBACK,
	WORKLOGS_FALLBACK,
} from "./constants";

const selectWorklogsById = (): PageState["worklogsById"] => {
	return pageState.worklogsById;
};

const selectWorklogIds = (): PageState["worklogIds"] => {
	return pageState.worklogIds;
};

const selectActivitiesById = (): PageState["activitiesById"] => {
	return pageState.activitiesById;
};

const selectActivityIds = (): PageState["activityIds"] => {
	return pageState.activityIds;
};

const selectGroupsById = (): PageState["groupsById"] => {
	return pageState.groupsById;
};

const selectGroupIds = (): PageState["groupIds"] => {
	return pageState.groupIds;
};

const selectCalendar = (): PageState["calendar"] => {
	return pageState.calendar;
};

const selectSelectedWorklogIds = (): PageState["selectedWorklogIds"] => {
	return pageState.selectedWorklogIds;
};

const selectHasChanges = (): PageState["hasChanges"] => {
	return pageState.hasChanges;
};

const selectWorklogs = (): Array<Worklog> => {
	const worklogsById = selectWorklogsById();
	const worklogIds = selectWorklogIds();

	return getEntities({
		byId: worklogsById,
		ids: worklogIds,
	});
};

const selectActivities = (): Array<Activity> => {
	const activitiesById = selectActivitiesById();
	const activityIds = selectActivityIds();

	return getEntities({
		byId: activitiesById,
		ids: activityIds,
	});
};

const selectGroups = (): Array<Group> => {
	const groupsById = selectGroupsById();
	const groupIds = selectGroupIds();

	return getEntities({
		byId: groupsById,
		ids: groupIds,
	});
};

const selectWorklogsByActivityId = (): Record<
	ActivityId,
	Array<Worklog> | undefined
> => {
	const worklogs = selectWorklogs();

	return Object.groupBy(
		worklogs,
		(
			worklog,
		) => {
			return worklog.activityId;
		},
	);
};

const selectWorklogsForActivity = (
	activityId: ActivityId,
): Array<Worklog> => {
	const worklogsByActivityId = selectWorklogsByActivityId();

	const worklogsForActivity = worklogsByActivityId[activityId];

	if (!isUndefined(worklogsForActivity)) {
		return worklogsForActivity;
	}

	return WORKLOGS_FALLBACK;
};

const selectWorklogsByGroupId = (): Record<
	GroupId,
	Array<Worklog> | undefined
> => {
	const worklogs = selectWorklogs();

	return Object.groupBy(
		worklogs,
		(
			worklog,
		) => {
			return worklog.groupId;
		},
	);
};

const selectWorklogsForGroup = (
	groupId: GroupId,
): Array<Worklog> => {
	const worklogsByGroupId = selectWorklogsByGroupId();

	const worklogsForGroup = worklogsByGroupId[groupId];

	if (!isUndefined(worklogsForGroup)) {
		return worklogsForGroup;
	}

	return WORKLOGS_FALLBACK;
};

const selectActivitiesByGroupId = (): Record<
	GroupId,
	Array<Activity> | undefined
> => {
	const activities = selectActivities();

	return Object.groupBy(
		activities,
		(
			activity,
		) => {
			return activity.groupId;
		},
	);
};

const selectActivitiesForGroup = (
	groupId: GroupId,
): Array<Activity> => {
	const activitiesByGroupId = selectActivitiesByGroupId();

	const activitiesForGroup = activitiesByGroupId[groupId];

	if (!isUndefined(activitiesForGroup)) {
		return activitiesForGroup;
	}

	return ACTIVITIES_FALLBACK;
};

const selectWorklogsForActivityForDate = (
	activityId: ActivityId,
	date: DateString,
): Worklog | undefined => {
	const worklogsForActivity = selectWorklogsForActivity(activityId);

	return worklogsForActivity.find((
		worklog,
	) => {
		return worklog.date === date;
	});
};

const selectHasWorklogsInActivity = (
	activityId: ActivityId,
): boolean => {
	const worklogsForActivity = selectWorklogsForActivity(activityId);

	return !isEmpty(worklogsForActivity);
};

const selectHasWorklogsInGroup = (
	groupId: GroupId,
): boolean => {
	const worklogsForGroup = selectWorklogsForGroup(groupId);

	return !isEmpty(worklogsForGroup);
};

const selectHasWorklogs = (): boolean => {
	const worklogs = selectWorklogs();

	return !isEmpty(worklogs);
};

const selectHasGroups = (): boolean => {
	const groups = selectGroups();

	return !isEmpty(groups);
};

const selectReportedDurationForGroupByDate = (
	groupId: GroupId,
): Partial<
	Record<
		DateString,
		Duration
	>
> => {
	const worklogsForGroup = selectWorklogsForGroup(groupId);

	return getReportedDurationByDate(worklogsForGroup);
};

const selectReportedDurationForGroupForDate = (
	groupId: GroupId,
	date: DateString,
): Duration => {
	const reportedDurationForGroupByDate = selectReportedDurationForGroupByDate(groupId);

	const duration = reportedDurationForGroupByDate[date];

	if (!isUndefined(duration)) {
		return duration;
	}

	return DURATION_FALLBACK;
};

const selectReportedDurationByDate = (): Partial<
	Record<
		DateString,
		Duration
	>
> => {
	const worklogs = selectWorklogs();

	return getReportedDurationByDate(worklogs);
};

const selectReportedDurationForDate = (
	date: DateString,
): Duration => {
	const reportedDurationByDate = selectReportedDurationByDate();

	const duration = reportedDurationByDate[date];

	if (!isUndefined(duration)) {
		return duration;
	}

	return DURATION_FALLBACK;
};

const selectNormTotal = (): Duration => {
	const calendar = selectCalendar();

	return sumBy(
		calendar,
		(
			calendarDay,
		) => {
			return calendarDay.norm;
		},
	);
};

const selectReportedDurationForActivity = (
	activityId: ActivityId,
): Duration => {
	const worklogsForActivity = selectWorklogsForActivity(activityId);

	return getReportedDuration(worklogsForActivity);
};

const selectReportedDurationForGroup = (
	groupId: GroupId,
): Duration => {
	const worklogsForGroup = selectWorklogsForGroup(groupId);

	return getReportedDuration(worklogsForGroup);
};

const selectReportedDuration = (): Duration => {
	const worklogs = selectWorklogs();

	return getReportedDuration(worklogs);
};

const selectHasSelectedWorklogs = (): boolean => {
	const selectedWorklogIds = selectSelectedWorklogIds();

	return !isEmpty(selectedWorklogIds);
};

const selectActivityNamesInGroup = (
	groupId: GroupId,
	activityIdToExclude?: ActivityId,
): Array<ActivityName> => {
	const activitiesForGroup = selectActivitiesForGroup(groupId);

	const activityNames: Array<ActivityName> = [];

	for (const activity of activitiesForGroup) {
		if (activity.id !== activityIdToExclude) {
			activityNames.push(activity.name);
		}
	}

	return activityNames;
};

const selectGroupNames = (
	groupIdToExclude?: GroupId,
): Array<GroupName> => {
	const groups = selectGroups();

	const groupNames: Array<GroupName> = [];

	for (const group of groups) {
		if (group.id !== groupIdToExclude) {
			groupNames.push(group.name);
		}
	}

	return groupNames;
};

const selectSelectionStateForActivity = (
	activityId: ActivityId,
): EntitySelectionState => {
	const worklogsForActivity = selectWorklogsForActivity(activityId);
	const selectedWorklogIds = selectSelectedWorklogIds();

	return getEntitySelectionState({
		selectedWorklogIds,
		worklogs: worklogsForActivity,
	});
};

const selectSelectionStateForGroup = (
	groupId: GroupId,
): EntitySelectionState => {
	const worklogsForGroup = selectWorklogsForGroup(groupId);
	const selectedWorklogIds = selectSelectedWorklogIds();

	return getEntitySelectionState({
		selectedWorklogIds,
		worklogs: worklogsForGroup,
	});
};

const selectSelectionStateForGroups = (): EntitySelectionState => {
	const worklogs = selectWorklogs();
	const selectedWorklogIds = selectSelectedWorklogIds();

	return getEntitySelectionState({
		selectedWorklogIds,
		worklogs,
	});
};

export {
	selectActivitiesById,
	selectActivitiesForGroup,
	selectActivityNamesInGroup,
	selectCalendar,
	selectGroupNames,
	selectGroups,
	selectHasChanges,
	selectHasGroups,
	selectHasSelectedWorklogs,
	selectHasWorklogs,
	selectHasWorklogsInActivity,
	selectHasWorklogsInGroup,
	selectNormTotal,
	selectReportedDuration,
	selectReportedDurationForActivity,
	selectReportedDurationForDate,
	selectReportedDurationForGroup,
	selectReportedDurationForGroupForDate,
	selectSelectedWorklogIds,
	selectSelectionStateForActivity,
	selectSelectionStateForGroup,
	selectSelectionStateForGroups,
	selectWorklogIds,
	selectWorklogsById,
	selectWorklogsForActivity,
	selectWorklogsForActivityForDate,
	selectWorklogsForGroup,
};
