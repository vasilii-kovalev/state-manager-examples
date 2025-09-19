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
> extends NormalizedEntities<
		Id,
		Entity
	> {
	filter?: (
		entity: Entity,
	) => boolean;
}

const getEntities = <
	Id extends EntityId,
	Entity extends EntityWithId<Id>,
>({
	byId,
	ids,
	filter = FILTER_DEFAULT,
}: GetEntitiesParams<
	Id,
	Entity
>): Array<Entity> => {
	const entities: Array<Entity> = [];

	for (const id of ids) {
		const entity = byId[id];

		if (isUndefined(entity)) {
			continue;
		}

		const shouldIncludeEntity = filter(entity);

		if (shouldIncludeEntity) {
			entities.push(entity);
		}
	}

	return entities;
};

export {
	getEntities,
};
