import {
	flavor,
	isoDate,
	maxValue,
	minValue,
	number,
	pipe,
	string,
} from "valibot";

import {
	DURATION_MAX,
} from "./constants";

const DateStringSchema = pipe(
	string(),
	isoDate(),
	flavor("date-string"),
);

const DurationSchema = pipe(
	number(),
	minValue(0),
	maxValue(DURATION_MAX),
	flavor("duration"),
);

export {
	DateStringSchema,
	DurationSchema,
};
