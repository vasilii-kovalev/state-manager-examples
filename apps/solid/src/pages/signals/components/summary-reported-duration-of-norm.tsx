import { type JSX } from "solid-js";

import { selectReportedDuration } from "../signals/page/derived";
import { ReportedDurationOfNorm } from "./reported-duration-of-norm";

const SummaryReportedDurationOfNorm = (): JSX.Element => {
	return <ReportedDurationOfNorm location="summary-info-cell" reported={selectReportedDuration()} />;
};

export { SummaryReportedDurationOfNorm };
