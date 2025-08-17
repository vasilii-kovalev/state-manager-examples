import {
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

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
} from "@/features/page/types";
import {
	convertPageDataToPageState,
} from "@/features/page/utilities/convert-page-data-to-page-state";
import {
	type TaskId,
} from "@/features/task/types";

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
	},
});

const pageReducer = pageSlice.reducer;
const {
	addActivity,
	addTask,
	removeActivity,
	removeTask,
	resetState,
	setInitialState,
} = pageSlice.actions;

export {
	addActivity,
	addTask,
	pageReducer,
	removeActivity,
	removeTask,
	resetState,
	setInitialState,
};
