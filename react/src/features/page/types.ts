import {
	type InferOutput,
} from "valibot";

import {
	type ActivityId,
} from "../activity/types";
import {
	type DateString,
	type Duration,
} from "../dates-and-time/types";
import {
	type TaskId,
} from "../task/types";
import {
	type WorklogId,
} from "../worklog/types";
import {
	type PageActivitySchema,
	type PageDataSchema,
	type PageStateSchema,
	type PageTaskSchema,
	type PageWorklogSchema,
} from "./schemas";

type PageData = InferOutput<typeof PageDataSchema>;

type PageState = InferOutput<typeof PageStateSchema>;

type PageWorklog = InferOutput<typeof PageWorklogSchema>;

type PageActivity = InferOutput<typeof PageActivitySchema>;

type PageTask = InferOutput<typeof PageTaskSchema>;

interface ReportingStatisticsSummary {
	reported: Duration;
	norm: Duration;
}

type ReportingStatisticsByDate = Record<DateString, ReportingStatisticsSummary>;

type EntityId =
	| WorklogId
	| ActivityId
	| TaskId;

interface EntityWithId<
	Id extends EntityId = EntityId,
> {
	id: Id;
}

interface NormalizedEntities<
	// Putting `Id` after `Entity` is more convenient for usage.
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	Entity extends EntityWithId<Id>,
	Id extends EntityId = EntityId,
> {
	byId: Record<Id, Entity>;
	ids: Array<Id>;
}

export {
	type EntityWithId,
	type NormalizedEntities,
	type PageActivity,
	type PageData,
	type PageState,
	type PageTask,
	type PageWorklog,
	type ReportingStatisticsByDate,
	type ReportingStatisticsSummary,
};
