// The deprecation of `useBlocker` is set incorrectly.
/* eslint-disable import-x/no-deprecated */
import {
	useBlocker,
} from "@tanstack/react-router";
import {
	type FC,
} from "react";

interface PageLeaveBlockerProps {
	hasChanges: boolean;
}

const PageLeaveBlocker: FC<PageLeaveBlockerProps> = (
	props,
) => {
	const {
		hasChanges,
	} = props;

	useBlocker({
		enableBeforeUnload: hasChanges,
		shouldBlockFn: () => {
			if (!hasChanges) {
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
