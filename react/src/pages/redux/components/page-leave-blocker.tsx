import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	PageLeaveBlocker as PageLeaveBlockerCommon,
} from "@/components/page-leave-blocker";

import {
	type RootState,
} from "../store";
import {
	selectHasChanges,
} from "../store/page/selectors";

const PageLeaveBlocker: FC = () => {
	const hasChanges = useSelector((state: RootState) => {
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
