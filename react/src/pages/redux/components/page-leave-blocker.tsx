import {
	type FC,
} from "react";

import {
	PageLeaveBlocker as PageLeaveBlockerCommon,
} from "@/components/page-leave-blocker";

import {
	useApplicationSelector,
} from "../store";
import {
	selectHasChanges,
} from "../store/page/selectors";

const PageLeaveBlocker: FC = () => {
	const hasChanges = useApplicationSelector((state) => {
		return selectHasChanges(state.page);
	});

	return (
		<PageLeaveBlockerCommon
			hasChanges={hasChanges}
		/>
	);
};

export {
	PageLeaveBlocker,
};
