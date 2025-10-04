import {
	createStore,
} from "solid-js/store";

import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	type PageState,
} from "@/features/page/types";
import {
	cloneDeep,
} from "@/utilities/clone-deep";

const [
	pageState,
	setPageState,
] = createStore<PageState>(cloneDeep(PAGE_STATE_DEFAULT));

export {
	pageState,
	setPageState,
};
