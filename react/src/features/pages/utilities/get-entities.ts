import {
	isUndefined,
} from "es-toolkit";
import {
	constant,
} from "es-toolkit/compat";

import {
	type EntityWithId,
	type NormalizedEntities,
} from "../types";

const FILTER_DEFAULT = constant(true);

interface GetEntitiesParams<Entity extends EntityWithId> extends NormalizedEntities<Entity> {
	filter?: (entity: Entity) => boolean;
}

const getEntities = <Entity extends EntityWithId>({
	byId,
	ids,
	filter = FILTER_DEFAULT,
}: GetEntitiesParams<Entity>): Array<Entity> => {
	return ids.reduce<Array<Entity>>(
		(
			entitiesCurrent,
			id,
		) => {
			const entity = byId[id];

			if (!isUndefined(entity)) {
				const shouldIncludeEntity = filter(entity);

				if (shouldIncludeEntity) {
					entitiesCurrent.push(entity);
				}
			}

			return entitiesCurrent;
		},
		[],
	);
};

export {
	getEntities,
};
