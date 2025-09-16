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

	return entities.reduce<NormalizedEntitiesType>(
		(
			normalizedEntitiesCurrent,
			entity,
		) => {
			// eslint-disable-next-line no-param-reassign
			normalizedEntitiesCurrent.byId[entity.id] = entity;

			normalizedEntitiesCurrent.ids.push(entity.id);

			return normalizedEntitiesCurrent;
		},
		{
			byId: ({} as NormalizedEntitiesType["byId"]),
			ids: [],
		},
	);
};

export {
	getNormalizedEntities,
};
