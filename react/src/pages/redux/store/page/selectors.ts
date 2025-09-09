import {
	createDraftSafeSelector,
	createSelector,
} from "@reduxjs/toolkit";
import {
	sumBy,
} from "es-toolkit";
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
} from "@/features/pages/types";
import {
	getEntities,
} from "@/features/pages/utilities/get-entities";
import {
	getEntitySelectionStateForGroups,
} from "@/features/pages/utilities/get-entity-selection-state-for-groups";
import {
	getReportedDuration,
} from "@/features/pages/utilities/get-reported-duration";
import {
	getReportedDurationForDate,
} from "@/features/pages/utilities/get-reported-duration-for-date";
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
		worklogs,
		date,
	): Worklog | undefined => {
		return worklogs.find((worklog) => {
			return worklog.date === date;
		});
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

const selectReportedDurationForGroupForDate = createSelector(
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

const selectNormTotal = createSelector(
	[
		selectCalendar,
	],
	(
		calendar,
	): Duration => {
		return sumBy(
			calendar,
			(calendarDay): Duration => {
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
	selectNormTotal,
	selectReportedDuration,
	selectReportedDurationForActivity,
	selectReportedDurationForDate,
	selectReportedDurationForGroup,
	selectReportedDurationForGroupForDate,
	selectSelectionState,
	selectSelectionStateForActivity,
	selectSelectionStateForGroup,
	selectWorklogsForActivity,
	selectWorklogsForActivityForDate,
	selectWorklogsForGroup,
};
