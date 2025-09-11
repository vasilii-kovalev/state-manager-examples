import {
	nanoid,
} from "nanoid";

import {
	type Worklog,
} from "@/features/worklog/types";
import {
	type RequireProperties,
} from "@/types/require-properties";

type GetNewWorklogParams = RequireProperties<
	Partial<Worklog>,
	| "activityId"
	| "date"
	| "duration"
	| "groupId"
>;

const getNewWorklog = ({
	activityId,
	date,
	duration,
	groupId,
	...override
}: GetNewWorklogParams): Worklog => {
	return {
		activityId,
		date,
		duration,
		groupId,
		id: nanoid(),
		...override,
	};
};

export {
	getNewWorklog,
};
