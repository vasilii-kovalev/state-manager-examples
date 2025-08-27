import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	type GroupId,
} from "@/features/group/types";

import {
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasWorklogsInGroup,
} from "../store/page/selectors";
import {
	removeGroup,
} from "../store/page/slice";

interface RemoveGroupButtonProps {
	groupId: GroupId;
}

const RemoveGroupButton: FC<RemoveGroupButtonProps> = ({
	groupId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const hasWorklogs = useSelector((state: RootState) => {
		return selectHasWorklogsInGroup(
			state.page,
			groupId,
		);
	});

	const handleRemoveGroup = (): void => {
		dispatch(removeGroup(groupId));
	};

	return (
		<button
			disabled={hasWorklogs}
			onClick={handleRemoveGroup}
			type="button"
		>
			Remove group
		</button>
	);
};

export {
	RemoveGroupButton,
};
