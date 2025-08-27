import {
	nanoid,
} from "nanoid";

import {
	type Group,
} from "@/features/group/types";

const getNewGroup = (
	override?: Partial<Group>,
): Group => {
	return {
		id: nanoid(),
		name: "",
		...override,
	};
};

export {
	getNewGroup,
};
