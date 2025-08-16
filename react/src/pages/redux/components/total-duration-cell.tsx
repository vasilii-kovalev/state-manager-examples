import {
	type FC,
} from "react";

import {
	type ReportingStatisticsSummary,
} from "@/features/page/types";

import {
	Cell,
} from "./cell";
import {
	TotalDuration,
} from "./total-duration";

interface TotalDurationCellProps {
	reportingStatisticsSummary: ReportingStatisticsSummary | undefined;
}

const TotalDurationCell: FC<TotalDurationCellProps> = ({
	reportingStatisticsSummary,
}) => {
	return (
		<Cell>
			<TotalDuration
				duration={reportingStatisticsSummary?.reported}
			/>
		</Cell>
	);
};

export {
	TotalDurationCell,
};
