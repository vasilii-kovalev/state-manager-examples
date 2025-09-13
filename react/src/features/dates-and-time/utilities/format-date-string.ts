import {
	type DateString,
} from "../types";
import {
	formatISO,
} from "./format-iso";

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
