import {
	type Component,
} from "solid-js";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	selectHasGroups,
} from "../signals/page/derived";
import {
	removeGroups,
} from "../utilities/remove-groups";

const handleRemoveGroups = (): void => {
	removeGroups();
};

const RemoveGroupsButton: Component = () => {
	const isBusy = useIsBusy();

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove all groups, their activities and worklogs";
			}}
			renderTarget={(
				targetProps,
			) => {
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={
							getClass([
								targetProps.class,
								"control icon-button",
							])
						}
						disabled={
							!selectHasGroups()
							|| isBusy()
						}
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

export {
	RemoveGroupsButton,
};
