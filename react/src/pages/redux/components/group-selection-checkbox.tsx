import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type GroupId,
} from "@/features/group/types";

import {
	type RootState,
} from "../store";
import {
	selectIsGroupSelected,
} from "../store/page/selectors";

interface GroupSelectionCheckboxProps {
	groupId: GroupId;
}

const GroupSelectionCheckbox: FC<GroupSelectionCheckboxProps> = ({
	groupId,
}) => {
	const isChecked = useSelector((state: RootState) => {
		return selectIsGroupSelected(
			state.page,
			groupId,
		);
	});

	return (
		<input
			checked={isChecked}
			type="checkbox"
		/>
	);
};

export {
	GroupSelectionCheckbox,
};
