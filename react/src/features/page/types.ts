import {
	type InferOutput,
} from "valibot";

import {
	type DateString,
	type Duration,
} from "../dates-and-time/types";
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

interface EntityWithId {
	id: string;
}

interface NormalizedEntities<Entity extends EntityWithId> {
	byId: Record<Entity["id"], Entity>;
	ids: Array<Entity["id"]>;
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
