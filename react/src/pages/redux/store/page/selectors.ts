import {
	createDraftSafeSelector,
	createSelector,
} from "@reduxjs/toolkit";
import {
	isEmpty,
} from "es-toolkit/compat";

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
	type ReportingStatisticsSummary,
} from "@/features/page/types";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";
import {
	getEntitySelectionStateForGroups,
} from "@/features/page/utilities/get-entity-selection-state-for-groups";
import {
	getReportedDurationForDate,
} from "@/features/page/utilities/get-reported-duration-for-date";
import {
	getReportingStatisticsSummary,
} from "@/features/page/utilities/get-reporting-statistics-summary";
import {
	type Worklog,
} from "@/features/worklog/types";

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

const selectWorklogsForActivity = createDraftSafeSelector(
	[
		selectWorklogs,
		(
			state: PageState,
			activityId: ActivityId,
		): ActivityId => {
			return activityId;
		},
	],
	(
		worklogs,
		activityId,
	): Array<Worklog> => {
		return worklogs.filter((worklog) => {
			return worklog.activityId === activityId;
		});
	},
);

const selectWorklogsForGroup = createDraftSafeSelector(
	[
		selectWorklogs,
		(
			state: PageState,
			groupId: GroupId,
		): GroupId => {
			return groupId;
		},
	],
	(
		worklogs,
		groupId,
	): Array<Worklog> => {
		return worklogs.filter((worklog) => {
			return worklog.groupId === groupId;
		});
	},
);

const selectActivitiesForGroup = createDraftSafeSelector(
	[
		selectActivities,
		(
			state: PageState,
			groupId: GroupId,
		): GroupId => {
			return groupId;
		},
	],
	(
		activities,
		groupId,
	): Array<Activity> => {
		return activities.filter((activity) => {
			return activity.groupId === groupId;
		});
	},
);

type WorklogsByDate = Record<DateString, Worklog>;

const selectWorklogsForActivityByDate = createSelector(
	[
		selectWorklogsForActivity,
	],
	(
		worklogs,
	): WorklogsByDate => {
		return worklogs.reduce<WorklogsByDate>(
			(
				worklogsByDateCurrent,
				worklog,
			) => {
				const {
					date,
				} = worklog;

				// eslint-disable-next-line no-param-reassign
				worklogsByDateCurrent[date] = worklog;

				return worklogsByDateCurrent;
			},
			{},
		);
	},
);

const selectHasWorklogsInActivity = createSelector(
	[
		selectWorklogsForActivity,
	],
	(
		worklogs,
	): boolean => {
		return !isEmpty(worklogs);
	},
);

const selectHasWorklogsInGroup = createSelector(
	[
		selectWorklogsForGroup,
	],
	(
		worklogs,
	): boolean => {
		return !isEmpty(worklogs);
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

const selectReportedDurationForDateForGroup = createSelector(
	[
		selectWorklogsForGroup,
		(
			state: PageState,
			groupId: GroupId,
			date: DateString,
		): DateString => {
			return date;
		},
	],
	(
		worklogs,
		date,
	): Duration => {
		return getReportedDurationForDate({
			date,
			worklogs,
		});
	},
);

const selectReportedDurationForDate = createSelector(
	[
		selectWorklogs,
		(
			state: PageState,
			date: DateString,
		): DateString => {
			return date;
		},
	],
	(
		worklogs,
		date,
	): Duration => {
		return getReportedDurationForDate({
			date,
			worklogs,
		});
	},
);

const selectReportingStatisticsSummaryForActivity = createSelector(
	[
		selectWorklogsForActivity,
		selectCalendar,
	],
	(
		worklogs,
		calendar,
	): ReportingStatisticsSummary => {
		return getReportingStatisticsSummary({
			calendar,
			worklogs,
		});
	},
);

const selectReportingStatisticsSummaryForGroup = createSelector(
	[
		selectWorklogsForGroup,
		selectCalendar,
	],
	(
		worklogs,
		calendar,
	): ReportingStatisticsSummary => {
		return getReportingStatisticsSummary({
			calendar,
			worklogs,
		});
	},
);

const selectReportingStatisticsSummary = createSelector(
	[
		selectWorklogs,
		selectCalendar,
	],
	(
		worklogs,
		calendar,
	): ReportingStatisticsSummary => {
		return getReportingStatisticsSummary({
			calendar,
			worklogs,
		});
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
		activities,
		activityIdToExclude,
	): Array<ActivityName> => {
		return activities.reduce<Array<ActivityName>>(
			(
				activityNamesCurrent,
				activity,
			) => {
				if (activity.id !== activityIdToExclude) {
					activityNamesCurrent.push(activity.name);
				}

				return activityNamesCurrent;
			},
			[],
		);
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
		return groups.reduce<Array<GroupName>>(
			(
				groupNamesCurrent,
				group,
			) => {
				if (group.id !== groupIdToExclude) {
					groupNamesCurrent.push(group.name);
				}

				return groupNamesCurrent;
			},
			[],
		);
	},
);

const selectSelectionStateForActivity = createSelector(
	[
		selectWorklogsForActivity,
		selectSelectedWorklogIds,
	],
	(
		worklogs,
		selectedWorklogIds,
	): EntitySelectionState => {
		return getEntitySelectionStateForGroups({
			selectedWorklogIds,
			worklogs,
		});
	},
);

const selectSelectionStateForGroup = createSelector(
	[
		selectWorklogsForGroup,
		selectSelectedWorklogIds,
	],
	(
		worklogs,
		selectedWorklogIds,
	): EntitySelectionState => {
		return getEntitySelectionStateForGroups({
			selectedWorklogIds,
			worklogs,
		});
	},
);

const selectSelectionState = createSelector(
	[
		selectWorklogs,
		selectSelectedWorklogIds,
	],
	(
		worklogs,
		selectedWorklogIds,
	): EntitySelectionState => {
		return getEntitySelectionStateForGroups({
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
	selectReportedDurationForDate,
	selectReportedDurationForDateForGroup,
	selectReportingStatisticsSummary,
	selectReportingStatisticsSummaryForActivity,
	selectReportingStatisticsSummaryForGroup,
	selectSelectionState,
	selectSelectionStateForActivity,
	selectSelectionStateForGroup,
	selectWorklogsForActivity,
	selectWorklogsForActivityByDate,
	selectWorklogsForGroup,
};
