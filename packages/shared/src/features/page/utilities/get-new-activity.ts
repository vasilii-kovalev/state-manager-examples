import { type RequireProperties } from "../../../types/require-properties";
import { generateId } from "../../../utilities/generate-id";
import { type Activity } from "../../activity/types";

type GetNewActivityParams = RequireProperties<Partial<Activity>, "groupId" | "name">;

const getNewActivity = (params: GetNewActivityParams): Activity => {
	const { groupId, id = generateId(), name } = params;

	return {
		groupId,
		id,
		name,
	};
};

export { getNewActivity };
