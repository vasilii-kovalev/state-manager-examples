import { type EntityId, type EntityWithId, type NormalizedEntities } from "../types";

const getNormalizedEntities = <
	// The ID is not inferred correctly otherwise.
	Entity extends EntityWithId<Id>,
	Id extends EntityId = Entity["id"],
>(
	entities: Array<Entity>,
): NormalizedEntities<Id, Entity> => {
	type NormalizedEntitiesType = NormalizedEntities<Id, Entity>;

	const normalizedEntities: NormalizedEntitiesType = {
		// A generic record does not accept `{}`. The loop below fills this dictionary.
		// oxlint-disable-next-line typescript/no-unsafe-type-assertion
		byId: {} as NormalizedEntitiesType["byId"],
		ids: [],
	};

	for (const entity of entities) {
		normalizedEntities.byId[entity.id] = entity;

		normalizedEntities.ids.push(entity.id);
	}

	return normalizedEntities;
};

export { getNormalizedEntities };
