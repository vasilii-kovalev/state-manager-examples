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
		groupId: "",
		id: nanoid(),
		name: "",
		...override,
	};
};

export {
	getNewActivity,
};
