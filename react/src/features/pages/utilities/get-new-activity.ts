import {
	nanoid,
} from "nanoid";

import {
	type Activity,
} from "@/features/activity/types";
import {
	type RequireProperties,
} from "@/types/require-properties";

type GetNewActivityParams = RequireProperties<
	Partial<Activity>,
	| "groupId"
	| "name"
>;

const getNewActivity = ({
	groupId,
	name,
	...override
}: GetNewActivityParams): Activity => {
	return {
		groupId,
		id: nanoid(),
		name,
		...override,
	};
};

export {
	getNewActivity,
};
