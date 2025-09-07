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
	selectReportingStatisticsSummaryForGroup,
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
	const reportingStatisticsSummary = useApplicationSelector((state) => {
		return selectReportingStatisticsSummaryForGroup(
			state.page,
			groupId,
		);
	});

	return (
		<ReportedDurationOfNorm
			location={`group-info-cell-${groupId}`}
			norm={reportingStatisticsSummary.norm}
			reported={reportingStatisticsSummary.reported}
		/>
	);
};

export {
	GroupReportedDurationOfNorm,
};
