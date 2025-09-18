import {
	type EntityId,
	type EntityWithId,
	type NormalizedEntities,
} from "../types";

const getNormalizedEntities = <
	// The ID is not inferred correctly otherwise.
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	Entity extends EntityWithId<Id>,
	Id extends EntityId = Entity["id"],
>(
	entities: Array<Entity>,
): NormalizedEntities<
	Id,
	Entity
> => {
	type NormalizedEntitiesType = NormalizedEntities<
		Id,
		Entity
	>;

	const normalizedEntities: NormalizedEntitiesType = {
		byId: ({} as NormalizedEntitiesType["byId"]),
		ids: [],
	};

	for (const entity of entities) {
		normalizedEntities.byId[entity.id] = entity;

		normalizedEntities.ids.push(entity.id);
	}

	return normalizedEntities;
};

export {
	getNormalizedEntities,
};
