import {
	type FC,
} from "react";

import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	formatWeekdayShort,
} from "@/features/dates-and-time/utilities/format-weekday-short";

interface HeaderCellWeekdayProps {
	date: DateString;
}

const HeaderCellWeekday: FC<HeaderCellWeekdayProps> = ({
	date,
}) => {
	return (
		<span>
			{formatWeekdayShort(date)}
		</span>
	);
};

export {
	HeaderCellWeekday,
};
