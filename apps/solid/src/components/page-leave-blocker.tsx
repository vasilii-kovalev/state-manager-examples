// The deprecation of `useBlocker` is set incorrectly.
import { useBlocker } from "@tanstack/solid-router";
import { type JSX } from "solid-js";

interface PageLeaveBlockerProps {
	hasChanges: boolean;
}

const PageLeaveBlocker = (props: PageLeaveBlockerProps): JSX.Element => {
	useBlocker({
		enableBeforeUnload: () => {
			return props.hasChanges;
		},
		shouldBlockFn: () => {
			if (!props.hasChanges) {
				return false;
			}

			// The leave prompt is a native confirm dialog.
			// oxlint-disable-next-line eslint/no-alert
			const shouldLeave = confirm("Are you sure you want to leave? The unsaved changes will be lost.");

			return !shouldLeave;
		},
	});

	return null;
};

export { PageLeaveBlocker };
