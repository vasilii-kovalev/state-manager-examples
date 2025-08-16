import {
	type FC,
} from "react";

import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	formatDayWithLeadingZero,
} from "@/features/dates-and-time/utilities/format-day-with-leading-zero";

interface HeaderCellDayProps {
	date: DateString;
}

const HeaderCellDay: FC<HeaderCellDayProps> = ({
	date,
}) => {
	return (
		<span>
			{formatDayWithLeadingZero(date)}
		</span>
	);
};

export {
	HeaderCellDay,
};
