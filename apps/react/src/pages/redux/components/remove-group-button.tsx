import { type ReactNode } from "react";

import { type GroupId } from "packages/shared/src/features/group/types";
import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { useApplicationDispatch } from "../store";
import { removeGroup } from "../store/page/slice";

interface RemoveGroupButtonProps {
	groupId: GroupId;
}

const RemoveGroupButton = (props: RemoveGroupButtonProps): ReactNode => {
	const { groupId } = props;

	const dispatch = useApplicationDispatch();

	const isBusy = useIsBusy();

	const handleRemoveGroup = (): void => {
		dispatch(removeGroup(groupId));
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove group, its activities and worklogs";
			}}
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={buildClass(className, control, iconButton)}
						disabled={isBusy}
						onClick={handleRemoveGroup}
						type="button"
					>
						-
					</button>
				);
			}}
			targetId={`remove-group-button-${groupId}`}
		/>
	);
};

export { RemoveGroupButton };
