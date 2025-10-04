import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	cloneDeep,
} from "@/utilities/clone-deep";

import {
	setPageState,
} from "../signals/page/base";

const unselectWorklogs = (): void => {
	setPageState(
		"selectedWorklogIds",
		cloneDeep(PAGE_STATE_DEFAULT.selectedWorklogIds),
	);
};

export {
	unselectWorklogs,
};
