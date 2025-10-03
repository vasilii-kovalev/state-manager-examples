import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";

import {
	setPageState,
} from "../signals/signals/page/base";

const resetState = (): void => {
	setPageState(PAGE_STATE_DEFAULT);
};

export {
	resetState,
};
