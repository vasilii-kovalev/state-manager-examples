import {
	type FC,
} from "react";

import {
	FlexColumn,
} from "@/components/flex-column";
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

const HeaderDateCell: FC<HeaderDateCellProps> = (
	props,
) => {
	const {
		date,
	} = props;

	return (
		<th
			className="cell"
		>
			<FlexColumn
				className="justify-center gap-row-2"
			>
				<span>
					{formatDayWithLeadingZero(date)}
				</span>

				<span>
					{formatWeekdayShort(date)}
				</span>
			</FlexColumn>
		</th>
	);
};

export {
	HeaderDateCell,
};
