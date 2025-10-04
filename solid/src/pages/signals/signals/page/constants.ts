import {
	type Activity,
} from "@/features/activity/types";
import {
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type Worklog,
} from "@/features/worklog/types";

const WORKLOGS_FALLBACK: Array<Worklog> = [];

const ACTIVITIES_FALLBACK: Array<Activity> = [];

const DURATION_FALLBACK: Duration = 0;

export {
	ACTIVITIES_FALLBACK,
	DURATION_FALLBACK,
	WORKLOGS_FALLBACK,
};
