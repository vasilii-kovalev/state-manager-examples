import {
	type Worklog,
} from "@/features/worklog/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	type Thunk,
} from "../store";
import {
	moveWorklog,
	removeWorklog,
	updateWorklogDuration,
} from "../store/page/slice";

type MoveWorklogToActivityParams = Pick<
	Worklog,
	| "activityId"
	| "groupId"
	| "id"
>;

const moveWorklogToActivity = (
	params: MoveWorklogToActivityParams,
): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			activityId,
			groupId,
			id,
		} = params;

		const {
			worklogsById,
		} = getState().page;

		const worklog = worklogsById[id];

		if (isUndefined(worklog)) {
			return;
		}

		const worklogs = Object.values(worklogsById);
		const existingWorklog = worklogs.find((
			worklogCurrent,
		) => {
			return (
				worklogCurrent.activityId === activityId
				&& worklogCurrent.date === worklog.date
			);
		});

		if (isUndefined(existingWorklog)) {
			dispatch(
				moveWorklog({
					activityId,
					groupId,
					id: worklog.id,
				}),
			);
		} else {
			dispatch(
				updateWorklogDuration({
					duration: existingWorklog.duration + worklog.duration,
					id: existingWorklog.id,
				}),
			);

			dispatch(removeWorklog(worklog.id));
		}
	};
};

export {
	moveWorklogToActivity,
};
