import {
	parse,
} from "valibot";

import {
	PageStateSchema,
} from "../schemas";
import {
	type PageData,
	type PageState,
} from "../types";
import {
	getNormalizedEntities,
} from "./get-normalized-entities";

const convertPageDataToPageState = (
	pageData: PageData,
): PageState => {
	const {
		byId: activitiesById,
		ids: activityIds,
	} = getNormalizedEntities(pageData.activities);
	const {
		byId: tasksById,
		ids: taskIds,
	} = getNormalizedEntities(pageData.tasks);
	const {
		byId: worklogsById,
		ids: worklogIds,
	} = getNormalizedEntities(pageData.worklogs);

	return parse(
		PageStateSchema,
		{
			activitiesById,
			activityIds,
			calendar: pageData.calendar,
			selectedWorklogIds: [],
			taskIds,
			tasksById,
			worklogIds,
			worklogsById,
		} satisfies PageState,
	);
};

export {
	convertPageDataToPageState,
};
