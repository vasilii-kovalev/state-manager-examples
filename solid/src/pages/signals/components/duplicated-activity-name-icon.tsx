import {
	type Accessor,
	type Component,
} from "solid-js";

import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type GroupId,
} from "@/features/group/types";

import {
	selectActivityNamesInGroup,
} from "../signals/page/derived";
import {
	DuplicatedNameIcon,
} from "./duplicated-name-icon";

interface DuplicatedActivityNameIconProps {
	activityId: ActivityId;
	name: ActivityName;
	groupId: GroupId;
}

const DuplicatedActivityNameIcon: Component<DuplicatedActivityNameIconProps> = (
	props,
) => {
	const hasDuplicate: Accessor<boolean> = () => {
		const existingActivityNames = selectActivityNamesInGroup(
			props.groupId,
			props.activityId,
		);

		return existingActivityNames.includes(props.name);
	};

	return (
		<DuplicatedNameIcon
			hasDuplicate={hasDuplicate()}
			tooltipBodyText="There are multiple activities with this name in the group"
			tooltipIconId={`duplicated-activity-name-${props.activityId}`}
		/>
	);
};

export {
	DuplicatedActivityNameIcon,
};
