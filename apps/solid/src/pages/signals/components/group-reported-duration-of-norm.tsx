import { type JSX } from "solid-js";

import { type Duration } from "packages/shared/src/features/dates-and-time/types";
import { type GroupId } from "packages/shared/src/features/group/types";

import { selectReportedDurationForGroup } from "../signals/page/derived";
import { ReportedDurationOfNorm } from "./reported-duration-of-norm";

interface GroupReportedDurationOfNormProps {
	groupId: GroupId;
}

const GroupReportedDurationOfNorm = (props: GroupReportedDurationOfNormProps): JSX.Element => {
	const reportedDurationForGroup = (): Duration => {
		return selectReportedDurationForGroup(props.groupId);
	};

	return <ReportedDurationOfNorm location={`group-info-cell-${props.groupId}`} reported={reportedDurationForGroup()} />;
};

export { GroupReportedDurationOfNorm };
