import { type JSX } from "solid-js";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { selectHasGroups } from "../signals/page/derived";
import { removeGroups } from "../utilities/remove-groups";

const handleRemoveGroups = (): void => {
	removeGroups();
};

const RemoveGroupsButton = (): JSX.Element => {
	const isBusy = useIsBusy();

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove all groups, their activities and worklogs";
			}}
			renderTarget={(targetProps) => {
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={buildClass(targetProps.class, control, iconButton)}
						disabled={!selectHasGroups() || isBusy()}
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
