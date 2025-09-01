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
	type PageState,
} from "@/features/page/types";
import {
	type Worklog,
	type WorklogId,
} from "@/features/worklog/types";

import {
	selectActivitiesForGroup,
} from "./selectors";

interface UpdateWorklogSelectionActionPayload {
	isSelected: boolean;
	worklogs: Array<Worklog>;
}

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

			state.hasChanges = true;
		},
		addGroup: (
			state,
			action: PayloadAction<Group>,
		) => {
			const group = action.payload;

			state.groupsById[group.id] = group;

			state.groupIds.unshift(group.id);

			state.hasChanges = true;
		},
		addWorklog: (
			state,
			action: PayloadAction<Worklog>,
		) => {
			const worklog = action.payload;

			state.worklogIds.push(worklog.id);

			state.worklogsById[worklog.id] = worklog;

			state.hasChanges = true;
		},
		moveWorklog: (
			state,
			action: PayloadAction<
				Pick<
					Worklog,
					| "activityId"
					| "groupId"
					| "id"
				>
			>,
		) => {
			const {
				activityId,
				groupId,
				id,
			} = action.payload;

			const worklog = state.worklogsById[id];

			if (isUndefined(worklog)) {
				return;
			}

			worklog.activityId = activityId;

			worklog.groupId = groupId;
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

			state.hasChanges = true;
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

			state.hasChanges = true;
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

			state.hasChanges = true;
		},
		resetState: () => {
			return PAGE_STATE_DEFAULT;
		},
		setInitialState: (
			state,
			action: PayloadAction<PageState>,
		) => {
			return action.payload;
		},
		unselectWorklogs: (
			state,
		) => {
			state.selectedWorklogIds = PAGE_STATE_DEFAULT.selectedWorklogIds;
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

			state.hasChanges = true;
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

			state.hasChanges = true;
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

			state.hasChanges = true;
		},
		updateWorklogsSelection: (
			state,
			action: PayloadAction<UpdateWorklogSelectionActionPayload>,
		) => {
			const {
				isSelected,
				worklogs,
			} = action.payload;

			const worklogIds = worklogs.map((worklog) => {
				return worklog.id;
			});

			state.selectedWorklogIds = isSelected
				? state.selectedWorklogIds.concat(worklogIds)
				: state.selectedWorklogIds.filter((worklogId) => {
					return !worklogIds.includes(worklogId);
				});
		},
	},
});

const pageReducer = pageSlice.reducer;
const {
	addActivity,
	addGroup,
	addWorklog,
	moveWorklog,
	removeActivity,
	removeGroup,
	removeWorklog,
	resetState,
	setInitialState,
	unselectWorklogs,
	updateActivityName,
	updateGroupName,
	updateWorklogDuration,
	updateWorklogsSelection,
} = pageSlice.actions;

export {
	addActivity,
	addGroup,
	addWorklog,
	moveWorklog,
	pageReducer,
	removeActivity,
	removeGroup,
	removeWorklog,
	resetState,
	setInitialState,
	unselectWorklogs,
	updateActivityName,
	updateGroupName,
	updateWorklogDuration,
	updateWorklogsSelection,
};
