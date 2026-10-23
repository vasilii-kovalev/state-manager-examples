import { PAGE_STATE_DEFAULT } from "packages/shared/src/features/page/constants";
import { cloneDeep } from "packages/shared/src/utilities/clone-deep";

import { setPageState } from "../signals/page/base";

const resetState = (): void => {
	setPageState(cloneDeep(PAGE_STATE_DEFAULT));
};

export { resetState };
