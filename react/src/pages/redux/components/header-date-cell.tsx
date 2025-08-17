import {
	type FC,
} from "react";

import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	formatDayWithLeadingZero,
} from "@/features/dates-and-time/utilities/format-day-with-leading-zero";
import {
	formatWeekdayShort,
} from "@/features/dates-and-time/utilities/format-weekday-short";

interface HeaderDateCellProps {
	date: DateString;
}

const HeaderDateCell: FC<HeaderDateCellProps> = ({
	date,
}) => {
	return (
		<th>
			<span>
				{formatDayWithLeadingZero(date)}
			</span>

			<span>
				{formatWeekdayShort(date)}
			</span>
		</th>
	);
};

export {
	HeaderDateCell,
};
