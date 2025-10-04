import {
	type Worklog,
	type WorklogId,
} from "@/features/worklog/types";
import {
	isEmpty,
} from "@/utilities/is-empty";

import {
	ENTITY_SELECTION_STATE,
} from "../constants";
import {
	type EntitySelectionState,
} from "../types";

interface GetEntitySelectionStateParams {
	selectedWorklogIds: Array<WorklogId>;
	worklogs: Array<Worklog>;
}

const getEntitySelectionState = (
	params: GetEntitySelectionStateParams,
): EntitySelectionState => {
	const {
		selectedWorklogIds,
		worklogs,
	} = params;

	const selectedWorklogs = worklogs.filter((
		worklog,
	) => {
		return selectedWorklogIds.includes(worklog.id);
	});

	if (isEmpty(selectedWorklogs)) {
		return ENTITY_SELECTION_STATE.UNSELECTED;
	}

	if (selectedWorklogs.length === worklogs.length) {
		return ENTITY_SELECTION_STATE.SELECTED;
	}

	return ENTITY_SELECTION_STATE.INDETERMINATE;
};

export {
	getEntitySelectionState,
};
