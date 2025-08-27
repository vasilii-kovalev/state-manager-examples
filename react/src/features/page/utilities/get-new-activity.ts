import {
	nanoid,
} from "nanoid";

import {
	type Activity,
} from "@/features/activity/types";

const getNewActivity = (
	override?: Partial<Activity>,
): Activity => {
	return {
		id: nanoid(),
		name: "",
		taskId: "",
		...override,
	};
};

export {
	getNewActivity,
};
