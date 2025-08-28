import {
	// eslint-disable-next-line import-x/no-deprecated
	Block,
} from "@tanstack/react-router";
import {
	type FC,
} from "react";

interface PageLeaveBlockerProps {
	hasChanges: boolean;
}

const PageLeaveBlocker: FC<PageLeaveBlockerProps> = ({
	hasChanges,
}) => {
	return (
		<Block
			enableBeforeUnload={hasChanges}
			shouldBlockFn={() => {
				if (!hasChanges) {
					return false;
				}

				// eslint-disable-next-line no-alert
				const shouldLeave = confirm("Are you sure you want to leave?");

				return !shouldLeave;
			}}
		/>
	);
};

export {
	PageLeaveBlocker,
};
