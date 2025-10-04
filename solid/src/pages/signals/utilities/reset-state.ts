import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	cloneDeep,
} from "@/utilities/clone-deep";

import {
	setPageState,
} from "../signals/page/base";

const resetState = (): void => {
	setPageState(cloneDeep(PAGE_STATE_DEFAULT));
};

export {
	resetState,
};
