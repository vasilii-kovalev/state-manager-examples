import {
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import {
	isUndefined,
} from "es-toolkit";

import {
	type Activity,
	type ActivityId,
} from "@/features/activity/types";
import {
	type Group,
	type GroupId,
} from "@/features/group/types";
import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	type PageData,
} from "@/features/page/types";
import {
	convertPageDataToPageState,
} from "@/features/page/utilities/convert-page-data-to-page-state";
import {
	type Worklog,
	type WorklogId,
} from "@/features/worklog/types";

import {
	selectActivitiesForGroup,
} from "./selectors";

const pageSlice = createSlice({
	initialState: PAGE_STATE_DEFAULT,
	name: "page",
	reducers: {
		addActivity: (
			state,
			action: PayloadAction<Activity>,
		) => {
			const activity = action.payload;

			state.activitiesById[activity.id] = activity;

			state.activityIds.unshift(activity.id);
		},
		addGroup: (
			state,
			action: PayloadAction<Group>,
		) => {
			const group = action.payload;

			state.groupsById[group.id] = group;

			state.groupIds.unshift(group.id);
		},
		addWorklog: (
			state,
			action: PayloadAction<Worklog>,
		) => {
			const worklog = action.payload;

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
		removeGroup: (
			state,
			action: PayloadAction<GroupId>,
		) => {
			const groupId = action.payload;

			delete state.groupsById[groupId];

			state.groupIds = state.groupIds.filter((groupIdCurrent) => {
				return groupIdCurrent !== groupId;
			});

			const activitiesForGroup = selectActivitiesForGroup(
				state,
				groupId,
			);

			activitiesForGroup.forEach((activity) => {
				delete state.activitiesById[activity.id];
			});

			state.activityIds = state.activityIds.filter((activityIdCurrent) => {
				return !activitiesForGroup.some((activity) => {
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
		updateActivityName: (
			state,
			action: PayloadAction<
				Pick<
					Activity,
					| "id"
					| "name"
				>
			>,
		) => {
			const {
				id,
				name,
			} = action.payload;

			const activity = state.activitiesById[id];

			if (isUndefined(activity)) {
				return;
			}

			activity.name = name;
		},
		updateGroupName: (
			state,
			action: PayloadAction<
				Pick<
					Group,
					| "id"
					| "name"
				>
			>,
		) => {
			const {
				id,
				name,
			} = action.payload;

			const group = state.groupsById[id];

			if (isUndefined(group)) {
				return;
			}

			group.name = name;
		},
		updateWorklogDuration: (
			state,
			action: PayloadAction<
				Pick<
					Worklog,
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
		},
	},
});

const pageReducer = pageSlice.reducer;
const {
	addActivity,
	addGroup,
	addWorklog,
	removeActivity,
	removeGroup,
	removeWorklog,
	resetState,
	setInitialState,
	updateActivityName,
	updateGroupName,
	updateWorklogDuration,
} = pageSlice.actions;

export {
	addActivity,
	addGroup,
	addWorklog,
	pageReducer,
	removeActivity,
	removeGroup,
	removeWorklog,
	resetState,
	setInitialState,
	updateActivityName,
	updateGroupName,
	updateWorklogDuration,
};
