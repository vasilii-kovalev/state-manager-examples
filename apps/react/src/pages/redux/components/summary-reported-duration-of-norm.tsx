import { type ReactNode } from "react";

import { useApplicationSelector } from "../store";
import { selectReportedDuration } from "../store/page/selectors";
import { ReportedDurationOfNorm } from "./reported-duration-of-norm";

const SummaryReportedDurationOfNorm = (): ReactNode => {
	const reportedDuration = useApplicationSelector((state) => {
		return selectReportedDuration(state.page);
	});

	return <ReportedDurationOfNorm location="summary-info-cell" reported={reportedDuration} />;
};

export { SummaryReportedDurationOfNorm };
