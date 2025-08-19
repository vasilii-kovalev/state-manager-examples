import {
	check,
	pipe,
	string,
} from "valibot";

// Floating point number with optional decimal part containing up to 2 digits.
// The `/u` flag is intentionally omitted to only support ASCII digits.
// eslint-disable-next-line require-unicode-regexp
const WORKLOG_INPUT_REGEXP = /^\d{0,2}(?<decimal>\.\d{0,2})?$/;

const WorklogInputSchema = pipe(
	string(),
	check(
		(value) => {
			if (value === "") {
				return true;
			}

			return WORKLOG_INPUT_REGEXP.test(value);
		},
		"Invalid worklog duration format",
	),
);

export {
	WorklogInputSchema,
};
