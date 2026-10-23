import { batch } from "solid-js";
import { parse } from "valibot";

import { GroupSchema } from "packages/shared/src/features/group/schemas";
import { type GroupId, type GroupName } from "packages/shared/src/features/group/types";
import { getNewGroup } from "packages/shared/src/features/page/utilities/get-new-group";
import { getNewGroupName } from "packages/shared/src/features/page/utilities/get-new-group-name";
import { isUndefined } from "packages/shared/src/utilities/is-undefined";

import { setPageState } from "../signals/page/base";
import { selectGroupNames } from "../signals/page/derived";

interface AddGroupParams {
	name?: GroupName;
}

const addGroup = (params: AddGroupParams = {}): GroupId => {
	const { name } = params;

	let groupName = name;

	if (isUndefined(groupName)) {
		const existingNames = selectGroupNames();

		groupName = getNewGroupName(existingNames);
	}

	const group = parse(
		GroupSchema,
		getNewGroup({
			name: groupName,
		}),
	);

	batch(() => {
		setPageState("groupsById", group.id, group);

		setPageState("groupIds", (groupIds) => {
			return [group.id, ...groupIds];
		});

		setPageState("hasChanges", true);
	});

	return group.id;
};

export { addGroup };
