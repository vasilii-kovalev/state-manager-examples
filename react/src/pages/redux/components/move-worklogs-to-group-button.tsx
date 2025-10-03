import {
	type FC,
} from "react";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	type GroupId,
} from "@/features/group/types";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	useApplicationDispatch,
	useApplicationSelector,
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

const MoveWorklogsToGroupButton: FC<MoveWorklogsToGroupButtonProps> = (
	props,
) => {
	const {
		groupId,
	} = props;

	const dispatch = useApplicationDispatch();

	const hasSelectedWorklogs = useApplicationSelector((
		state,
	) => {
		return selectHasSelectedWorklogs(state.page);
	});

	const isBusy = useIsBusy();

	if (!hasSelectedWorklogs) {
		return null;
	}

	const handleMoveWorklogsToGroup = (): void => {
		dispatch(moveWorklogsToGroup(groupId));
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Move worklogs to group";
			}}
			renderTarget={(
				targetProps,
			) => {
				const {
					className,
					...otherTargetProps
				} = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={
							getClass([
								className,
								"control icon-button",
							])
						}
						disabled={isBusy}
						onClick={handleMoveWorklogsToGroup}
						type="button"
					>
						←
					</button>
				);
			}}
			targetId={`move-worklogs-to-group-button-${groupId}`}
		/>
	);
};

export {
	MoveWorklogsToGroupButton,
};
