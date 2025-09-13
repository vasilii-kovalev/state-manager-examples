import {
	type Worklog,
} from "@/features/worklog/types";
import {
	type RequireProperties,
} from "@/types/require-properties";
import {
	generateId,
} from "@/utilities/generate-id";

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
	id = generateId(),
}: GetNewWorklogParams): Worklog => {
	return {
		activityId,
		date,
		duration,
		groupId,
		id,
	};
};

export {
	getNewWorklog,
};
