import {
	batch,
} from "solid-js";

import {
	type Activity,
} from "@/features/activity/types";

import {
	setPageState,
} from "../signals/page/base";

const updateActivityName = (
	params: Pick<
		Activity,
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
			"activitiesById",
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
	updateActivityName,
};
