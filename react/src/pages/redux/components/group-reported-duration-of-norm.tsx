import {
	type FC,
} from "react";

import {
	type GroupId,
} from "@/features/group/types";

import {
	useApplicationSelector,
} from "../store";
import {
	selectReportedDurationForGroup,
} from "../store/page/selectors";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";

interface GroupReportedDurationOfNormProps {
	groupId: GroupId;
}

const GroupReportedDurationOfNorm: FC<GroupReportedDurationOfNormProps> = ({
	groupId,
}) => {
	const reportedDurationForGroup = useApplicationSelector((state) => {
		return selectReportedDurationForGroup(
			state.page,
			groupId,
		);
	});

	return (
		<ReportedDurationOfNorm
			location={`group-info-cell-${groupId}`}
			reported={reportedDurationForGroup}
		/>
	);
};

export {
	GroupReportedDurationOfNorm,
};
