import { type ReactNode } from "react";

import { type GroupId } from "packages/shared/src/features/group/types";
import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { useApplicationDispatch, useApplicationSelector } from "../store";
import { selectHasSelectedWorklogs } from "../store/page/selectors";
import { moveWorklogsToGroup } from "../utilities/move-worklogs-to-group";

interface MoveWorklogsToGroupButtonProps {
	groupId: GroupId;
}

const MoveWorklogsToGroupButton = (props: MoveWorklogsToGroupButtonProps): ReactNode => {
	const { groupId } = props;

	const dispatch = useApplicationDispatch();

	const hasSelectedWorklogs = useApplicationSelector((state) => {
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
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={getClass([className, control, iconButton])}
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

export { MoveWorklogsToGroupButton };
