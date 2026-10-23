import { type JSX } from "solid-js";

import { PageLeaveBlocker as PageLeaveBlockerCommon } from "../../../components/page-leave-blocker";
import { selectHasChanges } from "../signals/page/derived";

const PageLeaveBlocker = (): JSX.Element => {
	return <PageLeaveBlockerCommon hasChanges={selectHasChanges()} />;
};

export { PageLeaveBlocker };
