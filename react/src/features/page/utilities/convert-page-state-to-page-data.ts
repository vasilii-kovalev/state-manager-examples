import {
	parse,
} from "valibot";

import {
	PageDataSchema,
} from "../schemas";
import {
	type PageData,
	type PageState,
} from "../types";
import {
	getEntities,
} from "./get-entities";

const convertPageStateToPageData = (
	pageState: PageState,
): PageData => {
	const activities = getEntities({
		byId: pageState.activitiesById,
		ids: pageState.activityIds,
	});
	const groups = getEntities({
		byId: pageState.groupsById,
		ids: pageState.groupIds,
	});
	const worklogs = getEntities({
		byId: pageState.worklogsById,
		ids: pageState.worklogIds,
	});

	return parse(
		PageDataSchema,
		{
			activities,
			calendar: pageState.calendar,
			groups,
			worklogs,
		} satisfies PageData,
	);
};

export {
	convertPageStateToPageData,
};
