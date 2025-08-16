import {
	type FC,
} from "react";

import {
	type DateString,
} from "@/features/dates-and-time/types";

import {
	HeaderCellDay,
} from "./header-cell-day";
import {
	HeaderCellWeekday,
} from "./header-cell-weekday";

interface HeaderCellProps {
	date: DateString;
}

const HeaderCell: FC<HeaderCellProps> = ({
	date,
}) => {
	return (
		<th>
			<HeaderCellDay
				date={date}
			/>

			<HeaderCellWeekday
				date={date}
			/>
		</th>
	);
};

export {
	HeaderCell,
};
