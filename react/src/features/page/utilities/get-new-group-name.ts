import {
	parse,
} from "valibot";

import {
	GroupNameSchema,
} from "@/features/group/schemas";
import {
	type GroupName,
} from "@/features/group/types";

import {
	generateUniqueName,
} from "./generate-unique-name";

const getNewGroupName = (
	existingNames: Array<GroupName>,
): GroupName => {
	const groupName = generateUniqueName({
		existingNames,
		namePrefix: "Group",
	});

	return parse(
		GroupNameSchema,
		groupName,
	);
};

export {
	getNewGroupName,
};
