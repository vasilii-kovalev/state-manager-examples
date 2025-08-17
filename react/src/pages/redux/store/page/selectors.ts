import {
	createDraftSafeSelector,
	createSelector,
} from "@reduxjs/toolkit";
import {
	isEmpty,
} from "es-toolkit/compat";

import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	type PageActivity,
	type PageState,
	type PageTask,
	type PageWorklog,
	type ReportingStatisticsByDate,
	type ReportingStatisticsSummary,
} from "@/features/page/types";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";
import {
	getReportingStatisticsByDate,
} from "@/features/page/utilities/get-reporting-statistics-by-date";
import {
	getReportingStatisticsSummary,
} from "@/features/page/utilities/get-reporting-statistics-summary";
import {
	type TaskId,
} from "@/features/task/types";

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

const selectTasksById = (
	state: PageState,
): PageState["tasksById"] => {
	return state.tasksById;
};

const selectTaskIds = (
	state: PageState,
): PageState["taskIds"] => {
	return state.taskIds;
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

const selectWorklogs = createSelector(
	[
		selectWorklogsById,
		selectWorklogIds,
	],
	(
		worklogsById,
		worklogIds,
	): Array<PageWorklog> => {
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
	): Array<PageActivity> => {
		return getEntities({
			byId: activitiesById,
			ids: activityIds,
		});
	},
);

const selectTasks = createSelector(
	[
		selectTasksById,
		selectTaskIds,
	],
	(
		tasksById,
		taskIds,
	): Array<PageTask> => {
		return getEntities({
			byId: tasksById,
			ids: taskIds,
		});
	},
);

const selectWorklogsForActivity = createSelector(
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
	): Array<PageWorklog> => {
		return worklogs.filter((worklog) => {
			return worklog.activityId === activityId;
		});
	},
);

const selectWorklogsForTask = createSelector(
	[
		selectWorklogs,
		(
			state: PageState,
			taskId: TaskId,
		): TaskId => {
			return taskId;
		},
	],
	(
		worklogs,
		taskId,
	): Array<PageWorklog> => {
		return worklogs.filter((worklog) => {
			return worklog.taskId === taskId;
		});
	},
);

const selectActivitiesForTask = createDraftSafeSelector(
	[
		selectActivities,
		(
			state: PageState,
			taskId: TaskId,
		): TaskId => {
			return taskId;
		},
	],
	(
		activities,
		taskId,
	): Array<PageActivity> => {
		return activities.filter((activity) => {
			return activity.taskId === taskId;
		});
	},
);

type WorklogsByDate = Record<DateString, PageWorklog>;

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

const selectHasWorklogsInTask = createSelector(
	[
		selectWorklogsForTask,
	],
	(
		worklogs,
	): boolean => {
		return !isEmpty(worklogs);
	},
);

const selectReportingStatisticsByDateForTask = createSelector(
	[
		selectWorklogsForTask,
		selectCalendar,
	],
	(
		worklogs,
		calendar,
	): ReportingStatisticsByDate => {
		return getReportingStatisticsByDate({
			calendar,
			worklogs,
		});
	},
);

const selectReportingStatisticsByDate = createSelector(
	[
		selectWorklogs,
		selectCalendar,
	],
	(
		worklogs,
		calendar,
	): ReportingStatisticsByDate => {
		return getReportingStatisticsByDate({
			calendar,
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

const selectReportingStatisticsSummaryForTask = createSelector(
	[
		selectWorklogsForTask,
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

const selectHasUnSavedChanges = createSelector(
	[
		selectWorklogs,
		selectActivities,
		selectTasks,
	],
	(
		worklogs,
		activities,
		tasks,
	): boolean => {
		const entities = [
			...worklogs,
			...activities,
			...tasks,
		];

		return entities.some((entity) => {
			return entity.isChanged;
		});
	},
);

const selectIsActivitySelected = createSelector(
	[
		selectWorklogsForActivity,
		selectSelectedWorklogIds,
	],
	(
		worklogs,
		selectedWorklogIds,
	): boolean => {
		return worklogs.every((worklog) => {
			return selectedWorklogIds.includes(worklog.id);
		});
	},
);

const selectIsTaskSelected = createSelector(
	[
		selectWorklogsForTask,
		selectSelectedWorklogIds,
	],
	(
		worklogs,
		selectedWorklogIds,
	): boolean => {
		return worklogs.every((worklog) => {
			return selectedWorklogIds.includes(worklog.id);
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

const selectActivityNamesInTask = createSelector(
	[
		selectActivitiesForTask,
		(
			state: PageState,
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

export {
	selectActivitiesForTask,
	selectActivityNamesInTask,
	selectCalendar,
	selectHasSelectedWorklogs,
	selectHasUnSavedChanges,
	selectHasWorklogsInActivity,
	selectHasWorklogsInTask,
	selectIsActivitySelected,
	selectIsTaskSelected,
	selectReportingStatisticsByDate,
	selectReportingStatisticsByDateForTask,
	selectReportingStatisticsSummary,
	selectReportingStatisticsSummaryForActivity,
	selectReportingStatisticsSummaryForTask,
	selectTasks,
	selectWorklogsForActivity,
	selectWorklogsForActivityByDate,
};
