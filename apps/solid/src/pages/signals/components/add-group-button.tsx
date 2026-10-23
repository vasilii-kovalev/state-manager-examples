import { type JSX } from "solid-js";

import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { addGroup } from "../utilities/add-group";

const handleAddGroup = (): void => {
	addGroup();
};

const AddGroupButton = (): JSX.Element => {
	const isBusy = useIsBusy();

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Add group";
			}}
			renderTarget={(targetProps) => {
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={getClass([targetProps.class, control, iconButton])}
						disabled={isBusy()}
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
