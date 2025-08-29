import {
	type PageData,
	type PageState,
} from "./types";

const PAGE_DATA_LOCAL_STORAGE_KEY = "page-data";

// In milliseconds.
const PAGE_DATA_PROCESSING_DELAY = 300;

const PAGE_DATA_DEFAULT: PageData = {
	activities: [],
	calendar: [],
	groups: [],
	worklogs: [],
};

const PAGE_STATE_DEFAULT: PageState = {
	activitiesById: {},
	activityIds: [],
	calendar: [],
	groupIds: [],
	groupsById: {},
	hasChanges: false,
	selectedWorklogIds: [],
	worklogIds: [],
	worklogsById: {},
};

const ENTITY_SELECTION_STATE = {
	INDETERMINATE: "INDETERMINATE",
	SELECTED: "SELECTED",
	UNSELECTED: "UNSELECTED",
} as const;

export {
	ENTITY_SELECTION_STATE,
	PAGE_DATA_DEFAULT,
	PAGE_DATA_LOCAL_STORAGE_KEY,
	PAGE_DATA_PROCESSING_DELAY,
	PAGE_STATE_DEFAULT,
};
