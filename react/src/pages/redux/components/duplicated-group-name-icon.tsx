import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type GroupId,
	type GroupName,
} from "@/features/group/types";

import {
	type RootState,
} from "../store";
import {
	selectGroupNames,
} from "../store/page/selectors";

interface DuplicatedGroupNameIconProps {
	name: GroupName;
	groupId: GroupId;
}

const DuplicatedGroupNameIcon: FC<DuplicatedGroupNameIconProps> = ({
	name,
	groupId,
}) => {
	const existingGroupNames = useSelector((state: RootState) => {
		return selectGroupNames(
			state.page,
			groupId,
		);
	});

	if (existingGroupNames.includes(name)) {
		return (
			<Fragment>
				(!)
			</Fragment>
		);
	}

	return null;
};

export {
	DuplicatedGroupNameIcon,
};
