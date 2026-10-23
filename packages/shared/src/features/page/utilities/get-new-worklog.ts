import { type RequireProperties } from "../../../types/require-properties";
import { generateId } from "../../../utilities/generate-id";
import { type Worklog } from "../../worklog/types";

type GetNewWorklogParams = RequireProperties<Partial<Worklog>, "activityId" | "date" | "duration" | "groupId">;

const getNewWorklog = (params: GetNewWorklogParams): Worklog => {
	const { activityId, date, duration, groupId, id = generateId() } = params;

	return {
		activityId,
		date,
		duration,
		groupId,
		id,
	};
};

export { getNewWorklog };
