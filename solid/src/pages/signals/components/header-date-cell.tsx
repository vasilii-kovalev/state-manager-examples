import {
	type Component,
} from "solid-js";

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

const HeaderDateCell: Component<HeaderDateCellProps> = (
	props,
) => {
	return (
		<th
			class="cell"
		>
			<FlexColumn
				class="justify-center gap-row-2"
			>
				<span>
					{formatDayWithLeadingZero(props.date)}
				</span>

				<span>
					{formatWeekdayShort(props.date)}
				</span>
			</FlexColumn>
		</th>
	);
};

export {
	HeaderDateCell,
};
