import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type GroupId,
} from "@/features/group/types";

import {
	type RootState,
} from "../store";
import {
	selectActivityNamesInGroup,
} from "../store/page/selectors";
import {
	DuplicatedNameIcon,
} from "./duplicated-name-icon";

interface DuplicatedActivityNameIconProps {
	activityId: ActivityId;
	name: ActivityName;
	groupId: GroupId;
}

const DuplicatedActivityNameIcon: FC<DuplicatedActivityNameIconProps> = ({
	activityId,
	name,
	groupId,
}) => {
	const existingActivityNames = useSelector((state: RootState) => {
		return selectActivityNamesInGroup(
			state.page,
			groupId,
			activityId,
		);
	});

	return (
		<DuplicatedNameIcon
			hasDuplicate={existingActivityNames.includes(name)}
			tooltipBodyText="There are multiple activities with this name in the group"
			tooltipIconId={`duplicated-activity-name-${activityId}`}
		/>
	);
};

export {
	DuplicatedActivityNameIcon,
};
