import {
	type Component,
} from "solid-js";

import {
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type GroupId,
} from "@/features/group/types";

import {
	selectReportedDurationForGroup,
} from "../signals/page/derived";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";

interface GroupReportedDurationOfNormProps {
	groupId: GroupId;
}

const GroupReportedDurationOfNorm: Component<GroupReportedDurationOfNormProps> = (
	props,
) => {
	const reportedDurationForGroup = (): Duration => {
		return selectReportedDurationForGroup(props.groupId);
	};

	return (
		<ReportedDurationOfNorm
			location={`group-info-cell-${props.groupId}`}
			reported={reportedDurationForGroup()}
		/>
	);
};

export {
	GroupReportedDurationOfNorm,
};
