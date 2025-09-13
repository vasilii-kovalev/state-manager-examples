import {
	parse,
} from "valibot";

import {
	GroupSchema,
} from "@/features/group/schemas";
import {
	type GroupId,
	type GroupName,
} from "@/features/group/types";
import {
	getNewGroup,
} from "@/features/page/utilities/get-new-group";
import {
	getNewGroupName,
} from "@/features/page/utilities/get-new-group-name";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	type Thunk,
} from "../store";
import {
	addGroup as addGroupAction,
} from "../store/page/slice";
import {
	getGroupNames,
} from "./get-group-names";

interface AddGroupParams {
	name?: GroupName;
}

const addGroup = ({
	name,
}: AddGroupParams = {}): Thunk<GroupId> => {
	return (
		dispatch,
	) => {
		let groupName = name;

		if (isUndefined(groupName)) {
			const existingNames = dispatch(getGroupNames());

			groupName = getNewGroupName(existingNames);
		}

		const group = parse(
			GroupSchema,
			getNewGroup({
				name: groupName,
			}),
		);

		dispatch(addGroupAction(group));

		return group.id;
	};
};

export {
	addGroup,
};
