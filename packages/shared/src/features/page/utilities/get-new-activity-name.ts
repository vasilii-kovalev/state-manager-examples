import { parse } from "valibot";

import { ActivityNameSchema } from "../../activity/schemas";
import { type ActivityName } from "../../activity/types";
import { generateUniqueName } from "./generate-unique-name";

const getNewActivityName = (existingNames: Array<ActivityName>): ActivityName => {
	const activityName = generateUniqueName({
		existingNames,
		namePrefix: "Activity",
	});

	return parse(ActivityNameSchema, activityName);
};

export { getNewActivityName };
