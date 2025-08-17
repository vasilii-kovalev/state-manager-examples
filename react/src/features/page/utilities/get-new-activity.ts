import {
	nanoid,
} from "nanoid";

import {
	type PageActivity,
} from "../types";

const getNewActivity = (
	override?: Partial<PageActivity>,
): PageActivity => {
	return {
		id: nanoid(),
		isChanged: true,
		name: "",
		taskId: "",
		...override,
	};
};

export {
	getNewActivity,
};
