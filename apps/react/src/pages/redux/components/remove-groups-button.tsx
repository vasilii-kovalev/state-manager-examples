import { type ReactNode } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { useApplicationDispatch, useApplicationSelector } from "../store";
import { selectHasGroups } from "../store/page/selectors";
import { removeGroups } from "../store/page/slice";

const RemoveGroupsButton = (): ReactNode => {
	const dispatch = useApplicationDispatch();

	const hasGroups = useApplicationSelector((state) => {
		return selectHasGroups(state.page);
	});

	const isBusy = useIsBusy();

	const handleRemoveGroups = (): void => {
		dispatch(removeGroups());
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove all groups, their activities and worklogs";
			}}
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={getClass([className, control, iconButton])}
						disabled={!hasGroups || isBusy}
						onClick={handleRemoveGroups}
						type="button"
					>
						-
					</button>
				);
			}}
			targetId="remove-groups-button"
		/>
	);
};

export { RemoveGroupsButton };
