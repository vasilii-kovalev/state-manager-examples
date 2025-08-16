import {
	type Duration,
} from "../types";

const durationFormatter = new Intl.NumberFormat(
	"en-US",
	{
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
	},
);

const formatDuration = (
	duration: Duration,
): string => {
	return durationFormatter.format(duration);
};

export {
	formatDuration,
};
