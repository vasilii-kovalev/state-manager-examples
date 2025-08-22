import {
	nanoid,
} from "nanoid";

import {
	type PageWorklog,
} from "../types";

const getNewWorklog = (
	override?: Partial<PageWorklog>,
): PageWorklog => {
	return {
		activityId: "",
		date: "",
		duration: 0,
		id: nanoid(),
		isChanged: true,
		taskId: "",
		...override,
	};
};

export {
	getNewWorklog,
};
