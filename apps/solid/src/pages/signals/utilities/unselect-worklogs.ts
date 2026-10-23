import { PAGE_STATE_DEFAULT } from "packages/shared/src/features/page/constants";
import { cloneDeep } from "packages/shared/src/utilities/clone-deep";

import { setPageState } from "../signals/page/base";

const unselectWorklogs = (): void => {
	setPageState("selectedWorklogIds", cloneDeep(PAGE_STATE_DEFAULT.selectedWorklogIds));
};

export { unselectWorklogs };
