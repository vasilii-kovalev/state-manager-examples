import {
	type InferOutput,
} from "valibot";

import {
	type ActivityId,
} from "../activity/types";
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
	Id extends EntityId = EntityId,
	Entity extends EntityWithId<Id> = EntityWithId<Id>,
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
};
