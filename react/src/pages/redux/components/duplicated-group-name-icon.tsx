import {
	type FC,
} from "react";

import {
	type GroupId,
	type GroupName,
} from "@/features/group/types";

import {
	useApplicationSelector,
} from "../store";
import {
	selectGroupNames,
} from "../store/page/selectors";
import {
	DuplicatedNameIcon,
} from "./duplicated-name-icon";

interface DuplicatedGroupNameIconProps {
	name: GroupName;
	groupId: GroupId;
}

const DuplicatedGroupNameIcon: FC<DuplicatedGroupNameIconProps> = (
	props,
) => {
	const {
		name,
		groupId,
	} = props;

	const existingGroupNames = useApplicationSelector((
		state,
	) => {
		return selectGroupNames(
			state.page,
			groupId,
		);
	});

	return (
		<DuplicatedNameIcon
			hasDuplicate={existingGroupNames.includes(name)}
			tooltipBodyText="There are multiple groups with this name"
			tooltipIconId={`duplicated-group-name-${groupId}`}
		/>
	);
};

export {
	DuplicatedGroupNameIcon,
};
