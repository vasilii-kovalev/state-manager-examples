import { type Activity } from "packages/shared/src/features/activity/types";
import { type Duration } from "packages/shared/src/features/dates-and-time/types";
import { type Worklog } from "packages/shared/src/features/worklog/types";

const WORKLOGS_FALLBACK: Array<Worklog> = [];

const ACTIVITIES_FALLBACK: Array<Activity> = [];

const DURATION_FALLBACK: Duration = 0;

export { ACTIVITIES_FALLBACK, DURATION_FALLBACK, WORKLOGS_FALLBACK };
