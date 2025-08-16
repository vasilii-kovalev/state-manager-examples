import {
	formatISO,
} from "date-fns";

import {
	type DateString,
} from "../types";

const formatDateString = (
	date: Date,
): DateString => {
	return formatISO(
		date,
		{
			representation: "date",
		},
	);
};

export {
	formatDateString,
};
