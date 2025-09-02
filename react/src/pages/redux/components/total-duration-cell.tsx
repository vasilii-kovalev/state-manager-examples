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
					"bg-gray-50",
					[
						isWeekend(date),
						/*
							`!important` is required, because shortcuts have less specificity.
							If a higher specificity is set in the UnoCSS config in `layers`,
							the default classes won't be able to override shortcuts in other places.
							So this is a lesser evil.
						*/
						"!bg-weekend",
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
