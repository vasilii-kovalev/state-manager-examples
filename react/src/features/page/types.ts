import {
	type InferOutput,
} from "valibot";

import {
	type ActivityId,
} from "../activity/types";
import {
	type Duration,
} from "../dates-and-time/types";
import {
	type GroupId,
} from "../group/types";
import {
	type WorklogId,
} from "../worklog/types";
import {
	type ENTITY_SELECTION_STATE,
} from "./constants";
import {
	type PageDataSchema,
	type PageStateSchema,
} from "./schemas";

type PageData = InferOutput<typeof PageDataSchema>;

type PageState = InferOutput<typeof PageStateSchema>;

interface ReportingStatisticsSummary {
	reported: Duration;
	norm: Duration;
}

type EntityId =
	| WorklogId
	| ActivityId
	| GroupId;

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

type EntitySelectionState = typeof ENTITY_SELECTION_STATE[keyof typeof ENTITY_SELECTION_STATE];

export {
	type EntityId,
	type EntitySelectionState,
	type EntityWithId,
	type NormalizedEntities,
	type PageData,
	type PageState,
	type ReportingStatisticsSummary,
};
