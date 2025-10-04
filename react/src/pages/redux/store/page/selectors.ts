import {
	createDraftSafeSelector,
	createSelector,
} from "@reduxjs/toolkit";

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
	ACTIVITIES_FALLBACK,
	DURATION_FALLBACK,
	WORKLOGS_FALLBACK,
} from "./constants";

const selectWorklogsById = (
	state: PageState,
): PageState["worklogsById"] => {
	return state.worklogsById;
};

const selectWorklogIds = (
	state: PageState,
): PageState["worklogIds"] => {
	return state.worklogIds;
};

const selectActivitiesById = (
	state: PageState,
): PageState["activitiesById"] => {
	return state.activitiesById;
};

const selectActivityIds = (
	state: PageState,
): PageState["activityIds"] => {
	return state.activityIds;
};

const selectGroupsById = (
	state: PageState,
): PageState["groupsById"] => {
	return state.groupsById;
};

const selectGroupIds = (
	state: PageState,
): PageState["groupIds"] => {
	return state.groupIds;
};

const selectCalendar = (
	state: PageState,
): PageState["calendar"] => {
	return state.calendar;
};

const selectSelectedWorklogIds = (
	state: PageState,
): PageState["selectedWorklogIds"] => {
	return state.selectedWorklogIds;
};

const selectHasChanges = (
	state: PageState,
): PageState["hasChanges"] => {
	return state.hasChanges;
};

const selectWorklogs = createSelector(
	[
		selectWorklogsById,
		selectWorklogIds,
	],
	(
		worklogsById,
		worklogIds,
	): Array<Worklog> => {
		return getEntities({
			byId: worklogsById,
			ids: worklogIds,
		});
	},
);

const selectActivities = createSelector(
	[
		selectActivitiesById,
		selectActivityIds,
	],
	(
		activitiesById,
		activityIds,
	): Array<Activity> => {
		return getEntities({
			byId: activitiesById,
			ids: activityIds,
		});
	},
);

const selectGroups = createSelector(
	[
		selectGroupsById,
		selectGroupIds,
	],
	(
		groupsById,
		groupIds,
	): Array<Group> => {
		return getEntities({
			byId: groupsById,
			ids: groupIds,
		});
	},
);

const selectWorklogsByActivityId = createDraftSafeSelector(
	[
		selectWorklogs,
	],
	(
		worklogs,
	): Record<
		ActivityId,
		Array<Worklog> | undefined
	> => {
		return Object.groupBy(
			worklogs,
			(
				worklog,
			) => {
				return worklog.activityId;
			},
		);
	},
);

const selectWorklogsForActivity = createDraftSafeSelector(
	[
		selectWorklogsByActivityId,
		(
			state: PageState,
			activityId: ActivityId,
		): ActivityId => {
			return activityId;
		},
	],
	(
		worklogsByActivityId,
		activityId,
	): Array<Worklog> => {
		const worklogsForActivity = worklogsByActivityId[activityId];

		if (!isUndefined(worklogsForActivity)) {
			return worklogsForActivity;
		}

		return WORKLOGS_FALLBACK;
	},
);

const selectWorklogsByGroupId = createDraftSafeSelector(
	[
		selectWorklogs,
	],
	(
		worklogs,
	): Record<
		GroupId,
		Array<Worklog> | undefined
	> => {
		return Object.groupBy(
			worklogs,
			(
				worklog,
			) => {
				return worklog.groupId;
			},
		);
	},
);

const selectWorklogsForGroup = createDraftSafeSelector(
	[
		selectWorklogsByGroupId,
		(
			state: PageState,
			groupId: GroupId,
		): GroupId => {
			return groupId;
		},
	],
	(
		worklogsByGroupId,
		groupId,
	): Array<Worklog> => {
		const worklogsForGroup = worklogsByGroupId[groupId];

		if (!isUndefined(worklogsForGroup)) {
			return worklogsForGroup;
		}

		return WORKLOGS_FALLBACK;
	},
);

const selectActivitiesByGroupId = createDraftSafeSelector(
	[
		selectActivities,
	],
	(
		activities,
	): Record<
		GroupId,
		Array<Activity> | undefined
	> => {
		return Object.groupBy(
			activities,
			(
				activity,
			) => {
				return activity.groupId;
			},
		);
	},
);

const selectActivitiesForGroup = createDraftSafeSelector(
	[
		selectActivitiesByGroupId,
		(
			state: PageState,
			groupId: GroupId,
		): GroupId => {
			return groupId;
		},
	],
	(
		activitiesByGroupId,
		groupId,
	): Array<Activity> => {
		const activitiesForGroup = activitiesByGroupId[groupId];

		if (!isUndefined(activitiesForGroup)) {
			return activitiesForGroup;
		}

		return ACTIVITIES_FALLBACK;
	},
);

const selectWorklogsForActivityForDate = createSelector(
	[
		selectWorklogsForActivity,
		(
			state: PageState,
			activityId: ActivityId,
			date: DateString,
		): DateString => {
			return date;
		},
	],
	(
		worklogsForActivity,
		date,
	): Worklog | undefined => {
		return worklogsForActivity.find((
			worklog,
		) => {
			return worklog.date === date;
		});
	},
);

const selectHasWorklogsInActivity = createSelector(
	[
		selectWorklogsForActivity,
	],
	(
		worklogsForActivity,
	): boolean => {
		return !isEmpty(worklogsForActivity);
	},
);

const selectHasWorklogsInGroup = createSelector(
	[
		selectWorklogsForGroup,
	],
	(
		worklogsForGroup,
	): boolean => {
		return !isEmpty(worklogsForGroup);
	},
);

const selectHasWorklogs = createSelector(
	[
		selectWorklogs,
	],
	(
		worklogs,
	): boolean => {
		return !isEmpty(worklogs);
	},
);

const selectHasGroups = createSelector(
	[
		selectGroups,
	],
	(
		groups,
	): boolean => {
		return !isEmpty(groups);
	},
);

const selectReportedDurationForGroupByDate = createSelector(
	[
		selectWorklogsForGroup,
	],
	(
		worklogsForGroup,
	): Partial<
		Record<
			DateString,
			Duration
		>
	> => {
		return getReportedDurationByDate(worklogsForGroup);
	},
);

const selectReportedDurationForGroupForDate = createSelector(
	[
		selectReportedDurationForGroupByDate,
		(
			state: PageState,
			groupId: GroupId,
			date: DateString,
		): DateString => {
			return date;
		},
	],
	(
		reportedDurationForGroupByDate,
		date,
	): Duration => {
		const duration = reportedDurationForGroupByDate[date];

		if (!isUndefined(duration)) {
			return duration;
		}

		return DURATION_FALLBACK;
	},
);

const selectReportedDurationByDate = createSelector(
	[
		selectWorklogs,
	],
	(
		worklogs,
	): Partial<
		Record<
			DateString,
			Duration
		>
	> => {
		return getReportedDurationByDate(worklogs);
	},
);

const selectReportedDurationForDate = createSelector(
	[
		selectReportedDurationByDate,
		(
			state: PageState,
			date: DateString,
		): DateString => {
			return date;
		},
	],
	(
		reportedDurationByDate,
		date,
	): Duration => {
		const duration = reportedDurationByDate[date];

		if (!isUndefined(duration)) {
			return duration;
		}

		return DURATION_FALLBACK;
	},
);

const selectNormTotal = createSelector(
	[
		selectCalendar,
	],
	(
		calendar,
	): Duration => {
		return sumBy(
			calendar,
			(
				calendarDay,
			): Duration => {
				return calendarDay.norm;
			},
		);
	},
);

const selectReportedDurationForActivity = createSelector(
	[
		selectWorklogsForActivity,
	],
	(
		worklogs,
	): Duration => {
		return getReportedDuration(worklogs);
	},
);

const selectReportedDurationForGroup = createSelector(
	[
		selectWorklogsForGroup,
	],
	(
		worklogs,
	): Duration => {
		return getReportedDuration(worklogs);
	},
);

const selectReportedDuration = createSelector(
	[
		selectWorklogs,
	],
	(
		worklogs,
	): Duration => {
		return getReportedDuration(worklogs);
	},
);

const selectHasSelectedWorklogs = createSelector(
	[
		selectSelectedWorklogIds,
	],
	(
		selectedWorklogIds,
	): boolean => {
		return !isEmpty(selectedWorklogIds);
	},
);

const selectActivityNamesInGroup = createSelector(
	[
		selectActivitiesForGroup,
		(
			state: PageState,
			groupId: GroupId,
			activityIdToExclude: ActivityId,
		): ActivityId => {
			return activityIdToExclude;
		},
	],
	(
		activitiesForGroup,
		activityIdToExclude,
	): Array<ActivityName> => {
		const activityNames: Array<ActivityName> = [];

		for (const activity of activitiesForGroup) {
			if (activity.id !== activityIdToExclude) {
				activityNames.push(activity.name);
			}
		}

		return activityNames;
	},
);

const selectGroupNames = createSelector(
	[
		selectGroups,
		(
			state: PageState,
			groupIdToExclude: GroupId,
		): GroupId => {
			return groupIdToExclude;
		},
	],
	(
		groups,
		groupIdToExclude,
	): Array<GroupName> => {
		const groupNames: Array<GroupName> = [];

		for (const group of groups) {
			if (group.id !== groupIdToExclude) {
				groupNames.push(group.name);
			}
		}

		return groupNames;
	},
);

const selectSelectionStateForActivity = createSelector(
	[
		selectWorklogsForActivity,
		selectSelectedWorklogIds,
	],
	(
		worklogsForActivity,
		selectedWorklogIds,
	): EntitySelectionState => {
		return getEntitySelectionState({
			selectedWorklogIds,
			worklogs: worklogsForActivity,
		});
	},
);

const selectSelectionStateForGroup = createSelector(
	[
		selectWorklogsForGroup,
		selectSelectedWorklogIds,
	],
	(
		worklogsForGroup,
		selectedWorklogIds,
	): EntitySelectionState => {
		return getEntitySelectionState({
			selectedWorklogIds,
			worklogs: worklogsForGroup,
		});
	},
);

const selectSelectionStateForGroups = createSelector(
	[
		selectWorklogs,
		selectSelectedWorklogIds,
	],
	(
		worklogs,
		selectedWorklogIds,
	): EntitySelectionState => {
		return getEntitySelectionState({
			selectedWorklogIds,
			worklogs,
		});
	},
);

export {
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
	selectSelectionStateForActivity,
	selectSelectionStateForGroup,
	selectSelectionStateForGroups,
	selectWorklogsForActivity,
	selectWorklogsForActivityForDate,
	selectWorklogsForGroup,
};
