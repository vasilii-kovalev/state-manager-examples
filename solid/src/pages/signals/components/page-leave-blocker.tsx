import {
	type Component,
} from "solid-js";

import {
	PageLeaveBlocker as PageLeaveBlockerCommon,
} from "@/components/page-leave-blocker";

import {
	selectHasChanges,
} from "../signals/page/derived";

const PageLeaveBlocker: Component = () => {
	return (
		<PageLeaveBlockerCommon
			hasChanges={selectHasChanges()}
		/>
	);
};

export {
	PageLeaveBlocker,
};
