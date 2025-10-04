import {
	batch,
} from "solid-js";

import {
	type Group,
} from "@/features/group/types";

import {
	setPageState,
} from "../signals/page/base";

const updateGroupName = (
	params: Pick<
		Group,
		| "id"
		| "name"
	>,
): void => {
	const {
		id,
		name,
	} = params;

	batch(() => {
		setPageState(
			"groupsById",
			id,
			"name",
			name,
		);

		setPageState(
			"hasChanges",
			true,
		);
	});
};

export {
	updateGroupName,
};
