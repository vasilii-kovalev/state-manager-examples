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
		id: nanoid(),
		taskId: "",
		...override,
	};
};

export {
	getNewWorklog,
};
