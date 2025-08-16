import {
	type PageData,
} from "./types";

const PAGE_DATA_LOCAL_STORAGE_KEY = "page-data";

// In milliseconds.
const PAGE_DATA_PROCESSING_DELAY = 2_000;

const PAGE_DATA_DEFAULT: PageData = {
	activitiesById: {},
	calendar: [],
	tasksById: {},
	worklogsById: {},
};

export {
	PAGE_DATA_DEFAULT,
	PAGE_DATA_LOCAL_STORAGE_KEY,
	PAGE_DATA_PROCESSING_DELAY,
};
