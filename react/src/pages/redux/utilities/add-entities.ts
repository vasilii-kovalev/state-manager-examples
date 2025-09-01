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

const GROUPS_COUNT = 2;
const ACTIVITIES_PER_GROUP_COUNT = 2;
const WORKLOG_DURATION = 8;

const addEntities = (): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			calendar,
		} = getState().page;

		for (
			let groupIndex = 0;
			groupIndex < GROUPS_COUNT;
			groupIndex += 1
		) {
			const groupId = dispatch(addGroup());

			for (
				let activityIndex = 0;
				activityIndex < ACTIVITIES_PER_GROUP_COUNT;
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
							duration: WORKLOG_DURATION,
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
