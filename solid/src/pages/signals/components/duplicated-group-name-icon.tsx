import {
	type Component,
} from "solid-js";

import {
	type GroupId,
	type GroupName,
} from "@/features/group/types";

import {
	selectGroupNames,
} from "../signals/page/derived";
import {
	DuplicatedNameIcon,
} from "./duplicated-name-icon";

interface DuplicatedGroupNameIconProps {
	name: GroupName;
	groupId: GroupId;
}

const DuplicatedGroupNameIcon: Component<DuplicatedGroupNameIconProps> = (
	props,
) => {
	const hasDuplicate = (): boolean => {
		const existingGroupNames = selectGroupNames(props.groupId);

		return existingGroupNames.includes(props.name);
	};

	return (
		<DuplicatedNameIcon
			hasDuplicate={hasDuplicate()}
			tooltipBodyText="There are multiple groups with this name"
			tooltipIconId={`duplicated-group-name-${props.groupId}`}
		/>
	);
};

export {
	DuplicatedGroupNameIcon,
};
