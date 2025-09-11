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

interface AddGroupsParams {
	activitiesPerGroupCount: number;
	groupsCount: number;
	worklogDuration: number;
}

const addGroups = ({
	activitiesPerGroupCount,
	groupsCount,
	worklogDuration,
}: AddGroupsParams): Thunk<void> => {
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
			const groupId = dispatch(
				addGroup({
					name: `Group ${groupIndex + 1}`,
				}),
			);

			for (
				let activityIndex = 0;
				activityIndex < activitiesPerGroupCount;
				activityIndex += 1
			) {
				const activityId = dispatch(
					addActivity({
						groupId,
						name: `Activity ${groupIndex + 1}.${activityIndex + 1}`,
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

const addGroupsWithTransaction: typeof addGroups = (
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
			dispatch(addGroups(...params));
		},
	});
};

export {
	addGroupsWithTransaction as addGroups,
};
