import { type JSX } from "solid-js";

import { type ActivityId, type ActivityName } from "packages/shared/src/features/activity/types";
import { type GroupId } from "packages/shared/src/features/group/types";

import { selectActivityNamesInGroup } from "../signals/page/derived";
import { DuplicatedNameIcon } from "./duplicated-name-icon";

interface DuplicatedActivityNameIconProps {
	activityId: ActivityId;
	name: ActivityName;
	groupId: GroupId;
}

const DuplicatedActivityNameIcon = (props: DuplicatedActivityNameIconProps): JSX.Element => {
	const hasDuplicate = (): boolean => {
		const existingActivityNames = selectActivityNamesInGroup(props.groupId, props.activityId);

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

export { DuplicatedActivityNameIcon };
