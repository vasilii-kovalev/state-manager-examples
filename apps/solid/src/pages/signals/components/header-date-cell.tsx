import { type Component } from "solid-js";

import { type DateString } from "packages/shared/src/features/dates-and-time/types";
import { formatDayWithLeadingZero } from "packages/shared/src/features/dates-and-time/utilities/format-day-with-leading-zero";
import { formatWeekdayShort } from "packages/shared/src/features/dates-and-time/utilities/format-weekday-short";

import { FlexColumn } from "../../../components/flex-column";
import { cell } from "./cell.css";
import { headerDate } from "./header-date-cell.css";

interface HeaderDateCellProps {
	date: DateString;
}

const HeaderDateCell: Component<HeaderDateCellProps> = (props) => {
	return (
		<th class={cell}>
			<FlexColumn class={headerDate}>
				<span>{formatDayWithLeadingZero(props.date)}</span>

				<span>{formatWeekdayShort(props.date)}</span>
			</FlexColumn>
		</th>
	);
};

export { HeaderDateCell };
