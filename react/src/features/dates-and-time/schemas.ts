import {
	flavor,
	isoDate,
	minValue,
	number,
	pipe,
	string,
} from "valibot";

const DateStringSchema = pipe(
	string(),
	isoDate(),
	flavor("date-string"),
);

const DurationSchema = pipe(
	number(),
	minValue(0),
	flavor("duration"),
);

export {
	DateStringSchema,
	DurationSchema,
};
