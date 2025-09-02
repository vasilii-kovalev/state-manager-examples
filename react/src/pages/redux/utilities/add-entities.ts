import {
	getNewWorklog,
} from "@/features/page/utilities/get-new-worklog";

import {
	type Thunk,
} from "../store";
import {
	addWorklog,
	updateStateFromTransaction,
} from "../store/page/slice";
import {
	addActivity,
} from "./add-activity";
import {
	addGroup,
} from "./add-group";
import {
	performTransaction,
} from "./perform-transaction";

interface AddEntitiesParams {
	activitiesPerGroupCount: number;
	groupsCount: number;
	worklogDuration: number;
}

const addEntities = ({
	activitiesPerGroupCount,
	groupsCount,
	worklogDuration,
}: AddEntitiesParams): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			calendar,
		} = getState().page;

		for (
			let groupIndex = 0;
			groupIndex < groupsCount;
			groupIndex += 1
		) {
			const groupId = dispatch(addGroup());

			for (
				let activityIndex = 0;
				activityIndex < activitiesPerGroupCount;
				activityIndex += 1
			) {
				const activityId = dispatch(
					addActivity({
						groupId,
					}),
				);

				calendar.forEach((calendarDay) => {
					if (calendarDay.norm > 0) {
						const worklog = getNewWorklog({
							activityId,
							date: calendarDay.date,
							duration: worklogDuration,
							groupId,
						});

						dispatch(addWorklog(worklog));
					}
				});
			}
		}
	};
};

const addEntitiesWithTransaction: typeof addEntities = (
	...params
) => {
	return performTransaction({
		onFinish: (
			dispatch,
			getState,
		) => {
			const pageStateNext = getState().page;

			dispatch(updateStateFromTransaction(pageStateNext));
		},
		transaction: (
			dispatch,
		) => {
			dispatch(addEntities(...params));
		},
	});
};

export {
	addEntitiesWithTransaction as addEntities,
};
