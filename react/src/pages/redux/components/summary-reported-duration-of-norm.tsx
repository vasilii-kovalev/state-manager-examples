import {
	type FC,
} from "react";

import {
	useApplicationSelector,
} from "../store";
import {
	selectReportingStatisticsSummary,
} from "../store/page/selectors";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";

const SummaryReportedDurationOfNorm: FC = () => {
	const reportingStatisticsSummary = useApplicationSelector((state) => {
		return selectReportingStatisticsSummary(state.page);
	});

	return (
		<ReportedDurationOfNorm
			location="summary-info-cell"
			norm={reportingStatisticsSummary.norm}
			reported={reportingStatisticsSummary.reported}
		/>
	);
};

export {
	SummaryReportedDurationOfNorm,
};
