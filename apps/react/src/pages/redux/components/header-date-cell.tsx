import { type FC } from "react";

import { type DateString } from "packages/shared/src/features/dates-and-time/types";
import { formatDayWithLeadingZero } from "packages/shared/src/features/dates-and-time/utilities/format-day-with-leading-zero";
import { formatWeekdayShort } from "packages/shared/src/features/dates-and-time/utilities/format-weekday-short";

import { FlexColumn } from "../../../components/flex-column";
import { cell } from "./cell.css";
import { headerDate } from "./header-date-cell.css";

interface HeaderDateCellProps {
	date: DateString;
}

const HeaderDateCell: FC<HeaderDateCellProps> = (props) => {
	const { date } = props;

	return (
		<th className={cell}>
			<FlexColumn className={headerDate}>
				<span>{formatDayWithLeadingZero(date)}</span>

				<span>{formatWeekdayShort(date)}</span>
			</FlexColumn>
		</th>
	);
};

export { HeaderDateCell };
