import {
	nanoid,
} from "nanoid";

import {
	type PageTask,
} from "../types";

const getNewTask = (
	override?: Partial<PageTask>,
): PageTask => {
	return {
		id: nanoid(),
		isChanged: true,
		name: "",
		...override,
	};
};

export {
	getNewTask,
};
