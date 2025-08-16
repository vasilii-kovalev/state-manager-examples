import {
	type EntityWithId,
	type NormalizedEntities,
} from "../types";

const getEntities = <Entity extends EntityWithId>(
	normalizedEntities: NormalizedEntities<Entity>,
): Array<Entity> => {
	return normalizedEntities.ids.map<Entity>((id) => {
		return normalizedEntities.byId[id];
	});
};

export {
	getEntities,
};
