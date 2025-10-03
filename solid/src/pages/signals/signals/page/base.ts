import {
	createStore,
} from "solid-js/store";

import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	type PageState,
} from "@/features/page/types";

const [
	pageState,
	setPageState,
] = createStore<PageState>(PAGE_STATE_DEFAULT);

export {
	pageState,
	setPageState,
};
