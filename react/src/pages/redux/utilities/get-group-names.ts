import {
	type GroupId,
	type GroupName,
} from "@/features/group/types";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";

import {
	type Thunk,
} from "../store";

interface GetGroupNamesParams {
	groupIdToExclude?: GroupId;
}

/*
	Can't use `selectGroupNames` selector, because the result will be memoized,
	which is undesirable in this case.
*/
const getGroupNames = (
	params: GetGroupNamesParams = {},
): Thunk<Array<GroupName>> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			groupIdToExclude,
		} = params;

		const {
			groupIds,
			groupsById,
		} = getState().page;

		const groups = getEntities({
			byId: groupsById,
			filter: (
				group,
			) => {
				return group.id !== groupIdToExclude;
			},
			ids: groupIds,
		});

		return groups.map<GroupName>((
			group,
		) => {
			return group.name;
		});
	};
};

export {
	getGroupNames,
};
