import {
	type EntityWithId,
	type NormalizedEntities,
} from "../types";

const getNormalizedEntities = <Entity extends EntityWithId>(
	entities: Array<Entity>,
): NormalizedEntities<Entity> => {
	type NormalizedEntitiesType = NormalizedEntities<Entity>;

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
