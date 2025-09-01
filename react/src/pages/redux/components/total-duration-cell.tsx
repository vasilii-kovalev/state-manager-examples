import {
	isWeekend,
} from "date-fns";
import {
	type FC,
} from "react";

import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	type ReportingStatisticsSummary,
} from "@/features/page/types";
import {
	getClass,
} from "@/utilities/get-class";

import {
	Cell,
} from "./cell";
import {
	TotalDuration,
} from "./total-duration";

interface TotalDurationCellProps {
	date: DateString;
	reportingStatisticsSummary: ReportingStatisticsSummary | undefined;
}

const TotalDurationCell: FC<TotalDurationCellProps> = ({
	date,
	reportingStatisticsSummary,
}) => {
	return (
		<Cell
			className={
				getClass([
					[
						"bg-weekend",
						isWeekend(date),
					],
				])
			}
		>
			<TotalDuration
				duration={reportingStatisticsSummary?.reported}
			/>
		</Cell>
	);
};

export {
	TotalDurationCell,
};
