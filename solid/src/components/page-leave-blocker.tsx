// The deprecation of `useBlocker` is set incorrectly.
/* eslint-disable import-x/no-deprecated */
import {
	useBlocker,
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
	useBlocker({
		enableBeforeUnload: () => {
			return props.hasChanges;
		},
		shouldBlockFn: () => {
			if (!props.hasChanges) {
				return false;
			}

			// In this case a simple approach is used.
			// eslint-disable-next-line no-alert
			const shouldLeave = confirm("Are you sure you want to leave? The unsaved changes will be lost.");

			return !shouldLeave;
		},
	});

	return null;
};

export {
	PageLeaveBlocker,
};
