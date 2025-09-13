import {
	constant,
} from "@/utilities/constant";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	type EntityId,
	type EntityWithId,
	type NormalizedEntities,
} from "../types";

const FILTER_DEFAULT = constant(true);

interface GetEntitiesParams<
	Id extends EntityId,
	Entity extends EntityWithId<Id>,
> extends NormalizedEntities<Id, Entity> {
	filter?: (entity: Entity) => boolean;
}

const getEntities = <
	Id extends EntityId,
	Entity extends EntityWithId<Id>,
>({
	byId,
	ids,
	filter = FILTER_DEFAULT,
}: GetEntitiesParams<Id, Entity>): Array<Entity> => {
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
