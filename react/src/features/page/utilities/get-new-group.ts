import {
	nanoid,
} from "nanoid";

import {
	type Group,
} from "@/features/group/types";
import {
	type RequireProperties,
} from "@/types/require-properties";

type GetNewGroupParams = RequireProperties<
	Partial<Group>,
	| "name"
>;

const getNewGroup = ({
	name,
	...override
}: GetNewGroupParams): Group => {
	return {
		id: nanoid(),
		name,
		...override,
	};
};

export {
	getNewGroup,
};
