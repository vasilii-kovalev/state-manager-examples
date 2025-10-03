import {
	type Accessor,
} from "solid-js";

import {
	type PageState,
} from "@/features/page/types";

import {
	pageState,
} from "./base";

const hasChanges: Accessor<PageState["hasChanges"]> = () => {
	return pageState.hasChanges;
};

export {
	hasChanges,
};
