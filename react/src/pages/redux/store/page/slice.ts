import {
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import {
	isUndefined,
} from "es-toolkit";

import {
	type ActivityId,
} from "@/features/activity/types";
import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	type PageActivity,
	type PageData,
	type PageTask,
	type PageWorklog,
} from "@/features/page/types";
import {
	convertPageDataToPageState,
} from "@/features/page/utilities/convert-page-data-to-page-state";
import {
	type TaskId,
} from "@/features/task/types";
import {
	type WorklogId,
} from "@/features/worklog/types";

import {
	selectActivitiesForTask,
} from "./selectors";

const pageSlice = createSlice({
	initialState: PAGE_STATE_DEFAULT,
	name: "page",
	reducers: {
		addActivity: (
			state,
			action: PayloadAction<PageActivity>,
		) => {
			const activity = action.payload;

			state.activitiesById[activity.id] = activity;

			state.activityIds.unshift(activity.id);
		},
		addTask: (
			state,
			action: PayloadAction<PageTask>,
		) => {
			const task = action.payload;

			state.tasksById[task.id] = task;

			state.taskIds.unshift(task.id);
		},
		addWorklog: (
			state,
			action: PayloadAction<
				Pick<
					PageWorklog,
					| "activityId"
					| "date"
					| "duration"
					| "id"
				>
			>,
		) => {
			const {
				activityId,
				date,
				duration,
				id,
			} = action.payload;

			const activity = state.activitiesById[activityId];

			if (isUndefined(activity)) {
				return;
			}

			const worklog: PageWorklog = {
				activityId,
				date,
				duration,
				id,
				isChanged: true,
				taskId: activity.taskId,
			};

			state.worklogIds.push(worklog.id);

			state.worklogsById[worklog.id] = worklog;
		},
		removeActivity: (
			state,
			action: PayloadAction<ActivityId>,
		) => {
			const activityId = action.payload;

			delete state.activitiesById[activityId];

			state.activityIds = state.activityIds.filter((activityIdCurrent) => {
				return activityIdCurrent !== activityId;
			});
		},
		removeTask: (
			state,
			action: PayloadAction<TaskId>,
		) => {
			const taskId = action.payload;

			delete state.tasksById[taskId];

			state.taskIds = state.taskIds.filter((taskIdCurrent) => {
				return taskIdCurrent !== taskId;
			});

			const activitiesForTask = selectActivitiesForTask(
				state,
				taskId,
			);

			activitiesForTask.forEach((activity) => {
				delete state.activitiesById[activity.id];
			});

			state.activityIds = state.activityIds.filter((activityIdCurrent) => {
				return !activitiesForTask.some((activity) => {
					return activity.id === activityIdCurrent;
				});
			});
		},
		removeWorklog: (
			state,
			action: PayloadAction<WorklogId>,
		) => {
			const worklogId = action.payload;

			delete state.worklogsById[worklogId];

			state.worklogIds = state.worklogIds.filter((worklogIdCurrent) => {
				return worklogIdCurrent !== worklogId;
			});
		},
		resetState: () => {
			return PAGE_STATE_DEFAULT;
		},
		setInitialState: (
			state,
			action: PayloadAction<PageData>,
		) => {
			try {
				const pageState = convertPageDataToPageState(action.payload);

				return pageState;
			} catch (error) {
				console.error(error);

				return PAGE_STATE_DEFAULT;
			}
		},
		updateWorklogDuration: (
			state,
			action: PayloadAction<
				Pick<
					PageWorklog,
					| "duration"
					| "id"
				>
			>,
		) => {
			const {
				duration,
				id,
			} = action.payload;

			const worklog = state.worklogsById[id];

			if (isUndefined(worklog)) {
				return;
			}

			worklog.duration = duration;

			worklog.isChanged = true;
		},
	},
});

const pageReducer = pageSlice.reducer;
const {
	addActivity,
	addTask,
	addWorklog,
	removeActivity,
	removeTask,
	removeWorklog,
	resetState,
	setInitialState,
	updateWorklogDuration,
} = pageSlice.actions;

export {
	addActivity,
	addTask,
	addWorklog,
	pageReducer,
	removeActivity,
	removeTask,
	removeWorklog,
	resetState,
	setInitialState,
	updateWorklogDuration,
};
