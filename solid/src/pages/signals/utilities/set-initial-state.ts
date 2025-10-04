import {
	type PageState,
} from "@/features/page/types";

import {
	setPageState,
} from "../signals/page/base";

const setInitialState = (
	pageStateInitial: PageState,
): void => {
	setPageState(pageStateInitial);
};

export {
	setInitialState,
};
