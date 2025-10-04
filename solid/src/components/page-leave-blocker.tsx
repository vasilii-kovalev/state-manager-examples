import {
	// The deprecation is set incorrectly. Also, it is unclear from the documentation, what is a correct approach.
	// eslint-disable-next-line import-x/no-deprecated
	Block,
} from "@tanstack/solid-router";
import {
	type Component,
} from "solid-js";

interface PageLeaveBlockerProps {
	hasChanges: boolean;
}

const PageLeaveBlocker: Component<PageLeaveBlockerProps> = (
	props,
) => {
	return (
		<Block
			enableBeforeUnload={props.hasChanges}
			shouldBlockFn={() => {
				if (!props.hasChanges) {
					return false;
				}

				// In this case a simple approach is used.
				// eslint-disable-next-line no-alert
				const shouldLeave = confirm("Are you sure you want to leave? The unsaved changes will be lost.");

				return !shouldLeave;
			}}
		/>
	);
};

export {
	PageLeaveBlocker,
};
