import {
	createSelector,
} from "@reduxjs/toolkit";

import {
	type ActivityId,
} from "@/features/activity/types";
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

const selectActivitiesForTask = createSelector(
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

const selectReportingStatisticsByDateForActivity = createSelector(
	[
		selectWorklogsForActivity,
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

export {
	selectActivitiesForTask,
	selectHasUnSavedChanges,
	selectReportingStatisticsByDate,
	selectReportingStatisticsByDateForActivity,
	selectReportingStatisticsByDateForTask,
	selectReportingStatisticsSummary,
	selectReportingStatisticsSummaryForActivity,
	selectReportingStatisticsSummaryForTask,
	selectTasks,
	selectWorklogsForActivity,
};
