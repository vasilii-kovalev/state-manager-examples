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
	addGroup,
} from "../utilities/add-group";

const handleAddGroup = (): void => {
	addGroup();
};

const AddGroupButton: Component = () => {
	const isBusy = useIsBusy();

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Add group";
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

export {
	AddGroupButton,
};
