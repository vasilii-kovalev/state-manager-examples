import {
	type PageData,
	type PageState,
} from "./types";

const PAGE_DATA_LOCAL_STORAGE_KEY = "page-data";

// In milliseconds.
const PAGE_DATA_PROCESSING_DELAY = 2_000;

const PAGE_DATA_DEFAULT: PageData = {
	activities: [],
	calendar: [],
	tasks: [],
	worklogs: [],
};

const PAGE_STATE_DEFAULT: PageState = {
	activitiesById: {},
	activityIds: [],
	calendar: [],
	selectedWorklogIds: [],
	taskIds: [],
	tasksById: {},
	worklogIds: [],
	worklogsById: {},
};

export {
	PAGE_DATA_DEFAULT,
	PAGE_DATA_LOCAL_STORAGE_KEY,
	PAGE_DATA_PROCESSING_DELAY,
	PAGE_STATE_DEFAULT,
};
