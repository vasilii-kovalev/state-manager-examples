import { type ReactNode } from "react";

import { type GroupId } from "packages/shared/src/features/group/types";
import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { useApplicationDispatch } from "../store";
import { addActivity } from "../utilities/add-activity";

interface AddActivityButtonProps {
	groupId: GroupId;
}

const AddActivityButton = (props: AddActivityButtonProps): ReactNode => {
	const { groupId } = props;

	const dispatch = useApplicationDispatch();

	const isBusy = useIsBusy();

	const handleAddActivity = (): void => {
		dispatch(
			addActivity({
				groupId,
			}),
		);
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Add activity";
			}}
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={getClass([className, control, iconButton])}
						disabled={isBusy}
						onClick={handleAddActivity}
						type="button"
					>
						+
					</button>
				);
			}}
			targetId={`add-activity-button-${groupId}`}
		/>
	);
};

export { AddActivityButton };
