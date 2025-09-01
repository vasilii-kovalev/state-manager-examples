import {
	parse,
} from "valibot";

import {
	GroupSchema,
} from "@/features/group/schemas";
import {
	type GroupId,
} from "@/features/group/types";
import {
	getNewGroup,
} from "@/features/page/utilities/get-new-group";
import {
	getNewGroupName,
} from "@/features/page/utilities/get-new-group-name";

import {
	type Thunk,
} from "../store";
import {
	addGroup as addGroupAction,
} from "../store/page/slice";
import {
	getGroupNames,
} from "./get-group-names";

const addGroup = (): Thunk<GroupId> => {
	return (
		dispatch,
	) => {
		const existingNames = dispatch(getGroupNames());
		const name = getNewGroupName(existingNames);
		const group = parse(
			GroupSchema,
			getNewGroup({
				name,
			}),
		);

		dispatch(addGroupAction(group));

		return group.id;
	};
};

export {
	addGroup,
};
