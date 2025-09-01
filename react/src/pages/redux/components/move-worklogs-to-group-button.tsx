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
	selectHasSelectedWorklogs,
} from "../store/page/selectors";
import {
	moveWorklogsToGroup,
} from "../utilities/move-worklogs-to-group";

interface MoveWorklogsToGroupButtonProps {
	groupId: GroupId;
}

const MoveWorklogsToGroupButton: FC<MoveWorklogsToGroupButtonProps> = ({
	groupId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const hasSelectedWorklogs = useSelector((state: RootState) => {
		return selectHasSelectedWorklogs(state.page);
	});

	if (!hasSelectedWorklogs) {
		return null;
	}

	const handleMoveWorklogsToGroup = (): void => {
		dispatch(moveWorklogsToGroup(groupId));
	};

	return (
		<button
			onClick={handleMoveWorklogsToGroup}
			type="button"
		>
			Move worklogs to group
		</button>
	);
};

export {
	MoveWorklogsToGroupButton,
};
