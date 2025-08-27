import {
	nanoid,
} from "nanoid";

import {
	type Worklog,
} from "@/features/worklog/types";

const getNewWorklog = (
	override?: Partial<Worklog>,
): Worklog => {
	return {
		activityId: "",
		date: "",
		duration: 0,
		groupId: "",
		id: nanoid(),
		...override,
	};
};

export {
	getNewWorklog,
};
