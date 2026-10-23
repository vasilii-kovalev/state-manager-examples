import { type ReactNode } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { useApplicationDispatch } from "../store";
import { addGroup } from "../utilities/add-group";

const AddGroupButton = (): ReactNode => {
	const dispatch = useApplicationDispatch();

	const isBusy = useIsBusy();

	const handleAddGroup = (): void => {
		dispatch(addGroup());
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Add group";
			}}
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={getClass([className, control, iconButton])}
						disabled={isBusy}
						onClick={handleAddGroup}
						type="button"
					>
						+
					</button>
				);
			}}
			targetId="add-group-button"
		/>
	);
};

export { AddGroupButton };
