import {
	type FC,
	Fragment,
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

	if (existingActivityNames.includes(name)) {
		return (
			<Fragment>
				(!)
			</Fragment>
		);
	}

	return null;
};

export {
	DuplicatedActivityNameIcon,
};
