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

const getNewWorklog = (
	params: GetNewWorklogParams,
): Worklog => {
	const {
		activityId,
		date,
		duration,
		groupId,
		id = generateId(),
	} = params;

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
